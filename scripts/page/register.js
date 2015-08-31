/**
 * Created by Administrator on 2015/8/22.
 */
$(function () {
    Global.tool.getPhoneCode();
    var protocol = $("#protocol");
    protocol.on("change", function () {
       $("label[for="+this.id+"]").find(".icon").toggleClass("c_7fb");
    });
    $("#registerSub").on("click", function () {
        var phone = $.trim($("input[name=phone]").val());
        var code = $.trim($("input[name=code]").val());
        var pwd = $.trim($("input[name=pwd]").val());
        var rePwd = $.trim($("input[name=rePwd]").val());
        if(phone == ""){
            Global.tool.messPop({content:"请输入手机号"})
        }else if(!Global.RegExp.phone.test(phone)){
            Global.tool.messPop({content:"手机号格式不对"})
        }else if(code == ""){
            Global.tool.messPop({content:"请输入验证码"})
        }else if(pwd == ""){
            Global.tool.messPop({content:"请输入密码"})
        }else if(!Global.RegExp.pwd.test(pwd)){
            Global.tool.messPop({content:"密码格式不对"})
        }else if(rePwd == ""){
            Global.tool.messPop({content:"请输入再次密码"})
        }else if(pwd !== rePwd){
            Global.tool.messPop({content:"输入密码不一致"})
        }else if(!protocol[0].checked){
            Global.tool.messPop({content:"请同意小租客协议"})
        }else{
            new PageModel({
                url:"User/RegisterStep1.ashx",
                beforeSend: function () {

                },
                data:{mobileNumber:phone,password:pwd,code:code},
                success: function (data) {
                    //带上userid
                    window.location.href = "information.html"
                }
            })
        }
    })
});