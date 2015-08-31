
//定义命名空间函数
var Global = {};
Global.namespace = function (str) {
    var arr = str.split("."), o = Global;
    for (i = (arr[0] = "Global") ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
};
Global.namespace("Global.tool");
Global.namespace("Global.String");
Global.namespace("Global.method");
Global.namespace("Global.tagCommon");
Global.namespace("Global.RegExp");
//示例:Global.namespace("A.Cat");A.Car.name="Tom";A.Cat.move=function(){...}

Global.tool.messPop = function (option) {
    var setting = $.extend({
        title: "",
        content: "",
        position: "center",//"bottom"//"top"
        timeout: 1500,
        callback: function (e) { }
    }, option || {});
    var oldPopBox = $("#prompt-box");
    if (oldPopBox[0]) { oldPopBox.remove(); }
    $("body").append(
        '<section class="prompt-box" id="prompt-box">' +
        '<span class="prompt-words">' + setting.content + '</span></section>'
    );
    var newPopBox = $("#prompt-box");
    setTimeout(function () {
        newPopBox.animate({
            opacity:0
        },500, function () {
            newPopBox.remove();
            setting.callback()
        })
    }, setting.timeout);
}
//去除HTML标签
Global.String.deleteHtmlTag = function (str, charLength) {
    var _str = str.replace(/<[^>].*?>/g, "");
    if (charLength != 0) {
        _str = _str.length > charLength ? _str.substr(0, charLength) + "..." : _str;
    }
    return _str;
};
//转换HTML标签
Global.String.zyDeChart = function (str) {
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
};
//还原HTML标签
Global.String.zyEnChart = function (str) {
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    return str;
};
Global.tool.gotoTop = function () {
    $("html").animate({ scrollTop: 0 }, "fast");
    $("body").animate({ scrollTop: 0 }, "fast");
};

Global.tool.numSwitch = function (arg) {
    arg = arg || {};
    arg.minus = arg.minus || function () {};
    arg.plus = arg.plus || function () {};
    arg.num = arg.num || function () {};

    $(".common_numSwitch").each(function (num,item) {
        var thisSwitch = this;
        var btns = $(item).find(".numSwitch_btn");
        var num = $(item).find("input[type=number]");
        var maxNum = 100000;
        function stopMinusStyle(){btns[0].style.color = "#ccc"}
        function resetMinusStyle(){btns[0].style.color = ""}
        if(num.val() == 1){stopMinusStyle()}
        btns.eq(0).on("click", function () {
            if(num.val() == 1){
                return false
            }else if(num.val() == 2){
                stopMinusStyle();
            }
            num[0].value -= 1;
            arg.minus.call(thisSwitch,btns[0],num.val());
            return false
        });
        btns.eq(1).on("click", function () {
            if(num.val() >= maxNum){
                return false
            }
            resetMinusStyle();
            num[0].value = parseInt(num[0].value) + 1;
            arg.plus.call(thisSwitch,btns[1],num.val());
            return false
        });
        num.on("keyup", function () {
            var input = this;
            input.value = this.value.replace(/\D/gi,"");
            if(input.value > maxNum){
                input.value = maxNum
            }else if(input.value <= 1){
                stopMinusStyle()
            }else if(input.value > 1){
                resetMinusStyle()
            }
        }).on("blur", function () {
            var input = this;
            if(this.value == ""){
                this.value = 1
            }
            arg.plus.call(thisSwitch,input,num.val());
        });
    });
};

directorName = "xiaozuke"; //根目录文件名
urlRoot = location.href.split(directorName)[0]+directorName + "/";
Global.tool.menuList = function () {
    $(function () {
        var list = $("#menu_list");
        if(!list[0])return;
        var str = '<div class="menu_list_con hide">' +
            '<span class="menu_list_triangle"></span>' +
            '<ul class="menu_list_main">' +
            '<li><a href="'+urlRoot+'pages/center/center.html'+'" >返回后台</a></li>' +
            '</ul>' +
            '</div>';
        $(".bar-nav").append(str);
        var list_con = $(".menu_list_con");
        list.on("click", function () {
            list_con.fadeToggle();
            $("body").on("click", function () {
                list_con.fadeOut()
            });
            return false
        });
    })
};
Global.tool.getPhoneCode = function () {
    //获取验证码
    $("#getPhoneCode").on("click", function () {
        var self = this;
        if(!self.messMark){
            var user = $.trim($("input[name=phone]").val());
            if(user === ""){
                Global.tool.messPop({content:"请输入手机号"})
            }else if(!Global.RegExp.phone.test(user)){
                Global.tool.messPop({content:"手机号格式不对"})
            }else{
                self.messMark = true;
//                      $.ajax({
//                            url:"",
//                            type:"post",
//                            error:function(e){
//                              Global.tool.messPop({content:"获取验证码失败"})
//                              self.messMark = false;
//                            },
//                            success: function (data) {
//
//                            }
//                        });
                //ajax成功执行后
                var defaultTime = 10;//短信发送间隔时间
                var num = $(self).find(".num");
                num.text(defaultTime);
                $(self).addClass("clickMark");
                var timer = setInterval(function () {
                    --defaultTime;
                    num.text(defaultTime);
                    if(defaultTime <= 0){
                        clearInterval(timer);
                        self.messMark = false;
                        $(self).removeClass("clickMark");
                    }
                },1000);
            }
        }
        return false
    });
};
Global.tool.fixPage = function (itemFunc) {
    var fixPage = $("#fixPage");
    function hidePage() {
        fixPage.animate({
            right:"-100%"
        })
    }
    function showPage() {
        fixPage.animate({
            right:"0"
        })
    }
    $("#showPage").on("click", function () {
        showPage()
    });
    fixPage.on("click", function () {
        hidePage();
    });
    fixPage.find(".table-view-cell").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        hidePage();
        itemFunc();
        return false
    })
};

Global.RegExp = {
    phone:/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    pwd:/^\S{6,30}$/
};

