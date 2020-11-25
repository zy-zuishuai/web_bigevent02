//开发环境服务地址
var baseUPL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(params){
    //拼接对应环境的服务器地址
    params.url= baseUPL + params.url
    //alert(params.url);
})