/**
 * Created by gsPersonal on 2015/6/26.
 */

$(function () {
    var local_loginInfo = localStorage.loginInfo;
    if (local_loginInfo) {
        var jsonInfo = JSON.parse(local_loginInfo);
        $("#user").val(jsonInfo.name);
        if (jsonInfo.pwd) {
            $("#pwd").val(jsonInfo.pwd);
        }
    }
    $("#loginSub").on("click", function () {
        var btnSub = this;
        var limitMark = false;
        $(btnSub).attr("disabled", "disabled");
        function limitFun() {
            $(btnSub).removeAttr("disabled");
        }


        var phone = $.trim($("input[name=phone]").val());
        var pwd = $.trim($("input[name=pwd]").val());
        if (phone == "") {
            Global.tool.messPop({ content: "请输入手机号" });
            limitFun();
            return false;
        }
        if(!Global.RegExp.phone.test(phone)){
            Global.tool.messPop({ content: "手机号格式不对" });
            limitFun();
            return false
        }
        if (pwd == "") {
            Global.tool.messPop({ content: "请输入密码" });
            limitFun();
            return false;
        }
        function loginBtn_mark() {
            $(btnSub).toggleClass("start_login");
        }
        new PageModel({
            type: "post",
            url: "User/Authentication.ashx",
            data: { mobileNumber: phone, password: pwd},
            beforeSend: function () {
                if (!$(btnSub).hasClass("start_login")) {
                    loginBtn_mark()
                }
            },
            success: function (data) {
                loginBtn_mark();
                if (data.ErrorMessage) {
                    Global.tool.messPop({
                        content: data.ErrorMessage,
                        callback: function () {
                            loginBtn_mark();
                        }
                    });
                } else {
                    localStorage.loginInfo = JSON.stringify("");
                    var toUrl = localStorage.login_toUrl;
                    if(toUrl){
                        delete localStorage.login_toUrl;
                        window.location.href = eval(toUrl);
                        return
                    }
                    alert("进入主页");
                    window.location.href = "";
                }
            },
            complete: function () {
                loginBtn_mark();
                //$(btnSub).removeClass("start_login");
                limitFun();
            }
        });
        return false;
    });
});

