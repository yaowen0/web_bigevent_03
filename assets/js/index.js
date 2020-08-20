$(function () {
    // 获取
    getUserInof();
    // 退出
    $("#btnLogout").on("click", function () {
        //eg1
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem("token")
            // 跳转login.html
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
        });
    })
})
// 获取用户信息(封装到入口函数外面 因为后面user还需要用到单前函数)

function getUserInof() {
    // 发送ajax 
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     // 重新登录 因为token过期时间为12个小时 可能token为空
        //     Authorization: localStorage.getItem('token') || ""
        // },
        // 判断状态码
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功:
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 用户名:(昵称优先,没有就用username)
    var name = user.nickname || user.username;
    // 用户头像
    if (user.user_pic !== null) {
        // 有头像的情况下:显示自身头像 隐藏默认的span
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    }
    // 无头像的情况下:显示默认的span头像, 隐藏一smile
    else {
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text)
    }


}