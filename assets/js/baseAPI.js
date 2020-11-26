//开发环境服务地址
var baseUPL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(params){
    //拼接对应环境的服务器地址
    params.url= baseUPL + params.url
    //alert(params.url);






    if(params.url.indexOf("/my/") !== -1){
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }


    params.complete =function(res){
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if(obj,status ==1 && obj.message =="身份认证失败!"){
           localStorage.removeItem("token");
           location.href = '/login.html'  
        }
    }
});
