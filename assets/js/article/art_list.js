$(function () {
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    };
    initTable();
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                var str = template("tpl-table", res);
                $("tbody").html(str);
                renderPage(res.total)
            }
        })
    }
    var form = layui.form
    initCate();
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmStr);
                form.render();
            }
        })
    }
    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        var state = $("[name=state]").val();
        var cate_id = $("[name=cate_id]").val();
        q.state = state;
        q.cate_id = cate_id;
        initTable()
    })
    var laypage = layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,

            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],


            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) {
                    initTable();
                }
            }
        });
        var layer = layui.layer;
        $("tbody").on('click', ".btn-delete", function () {
            var Id = $(this).attr("data-id");
            layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
                //do something
                $.ajax({
                    method: 'get',
                    url: '/my/article/delete/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        layer.msg("恭喜您，文章删除成功！")
                        if ($(".btn-delete").length == 1 && q.pagenum > 1) q.pagenum--;
                        initTable();
                    }
                })

                layer.close(index);
            });
        })
    }
})