/**
 * Created by Administrator on 2015/8/27.
 */
$(function () {
   $("#resetPwd").on("click", function () {
       var pwd = $.trim($("input[name=pwd]").val());
       var rePwd = $.trim($("input[name=rePwd]").val());

       if(pwd == ""){
           Global.tool.messPop({content:"请输入密码"})
       }else if(!Global.RegExp.pwd.test(pwd)){
           Global.tool.messPop({content:"密码格式不对"})
       }else if(pwd !== rePwd){
           Global.tool.messPop({content:"密码输入不一致"})
       }else{

       }
   })
});