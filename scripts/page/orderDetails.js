/**
 * Created by Administrator on 2015/8/22.
 */
$(function () {    
    TouchSlide({ 
        slideCell:"#focus",
        titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell:".bd ul", 
        effect:"left", 
        autoPlay:true,//自动播放
        autoPage:true, //自动分页
        switchLoad:"_src" //切换加载，真实图片路径为"_src" 
    });   
    $("#focus .hd li").text("");      
    $("#orderBtn").on("click",function(){
        $("#Popup").fadeIn();
    });   
    $("#Popup").on("click",function(){
        $(this).fadeOut();
        return false;
    });
    $("#Popup .con").on("click",function(){
        return false;
    });
});