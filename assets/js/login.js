$(function () {
    $("#link_reg").on("click", function () {
        $('.login_box').hide();
        $(".reg_box").show()
    })
    $("#link_login").on("click", function () {
        $('.login_box').show();
        $(".reg_box").hide()
    })
    // 自定义验证规则
    var form = layui.form;
    form.verify({
        // 密码的规则
        pwd: [
            /^[\S]{6,16}$/, "密码必须6-16位,且不能输入空格"
        ],
        repwd: function (value) {
            // 寻找 reg_box中 name=password的input
            var pwd = $(".reg_box input[name=password]").val();
            // 进行比较
            if (pwd !== value) {
                return "两次密码输入不一致!"
            }
        }
    });
    // 注册功能
    var layer = layui.layer;
    $('#form_reg').on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg_box input[name=username]").val(),
                password: $(".reg_box input[name=password]").val(),
            },
            success: function (res) {
                // 返回状态判断
                if (res.status != 0) return layer.msg(res.massage);
                layer.msg("注册成功,请登录");
                // 手动切换到登录表单
                $("#link_login").click();
                // 重置from表单
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录
    $('#form_login').submit(function (e) {
        // 阻止表单提交
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                // 返回状态判断
                if (res.status != 0) return layer.msg(res.massage);
                layer.msg("恭喜您,登录成功");
                localStorage.setItem("token", res.token);
                location.href = "/index.html"
            }
        })
    })
})