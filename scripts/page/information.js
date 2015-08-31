/**
 * Created by Administrator on 2015/8/26.
 */
$(function () {
    $("#registerSub").on("click", function () {
        var username = $.trim($("input[name=username]"));
        var adr = $.trim($("input[name=adr]"));
        var words = $.trim($("input[name=words]"));
        var height = $.trim($("input[name=height]"));
        var weight = $.trim($("input[name=weight]"));
        var sex = $("input[name=sex]");
        var status = $.trim($("input[name=status]"));
        var interest = $.trim($("input[name=interest]"));

        if(username == ""){
            Global.tool.messPop({content:"请输入昵称"})
        }else{
            sex.each(function (index,sexItem) {

            });

//            new PageModel({
//
//            })
        }
    })
});