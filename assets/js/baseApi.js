// 开发环境服务器地址
var baseUrl = "http://ajax.frontend.itheima.net";
// 拦截ajax请求 get post ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    params.url = baseUrl + params.url;

})
