// 开发环境服务器地址
var baseUrl = "http://ajax.frontend.itheima.net";
// 拦截ajax请求 get post ajax
// 处理参数
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    params.url = baseUrl + params.url;
    // 对需要权限的接口配置头信息
    // 必须以my开头才行
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            // 重新登录 因为token过期时间为12个小时 可能token为空
            Authorization: localStorage.getItem('token') || ""
        }
    }
    params.complete = function (res) {
        console.log(res);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem("token")
            // 跳转login.html
            location.href = "/login.html"
        }
    }

})
