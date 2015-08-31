/**
 * Created by Administrator on 2015/8/25.
 */
$(function () {
    var cityBd = $("#city_bd");
    var _search = $("#index_search");
    var del = $("#del_searchVal");
    var goSearch = $("#go_search");

    /*
     城市定位
     */
    // 百度地图API功能
    var cityName = $("#user_cityName"),
        defaultCity = $("#user_defaultCity"),
        alreadyGetCoordinate = false,
        local_info = localStorage._userCityeInfo,
        local_info_J;
    cityName.text(cityName.text().substring(0,2));
    //判断是否已经定位
    if(local_info){
        local_info_J = JSON.parse(local_info);
        var _cityInfo = local_info_J;
        cityName.text(_cityInfo.name).attr({lng: _cityInfo.lng,lat:_cityInfo.lat});
        defaultCity.text(_cityInfo.name);
    }

    function indexMapFun(result){
        /**
         * 写入城市信息
         */
        var points = result.center;
        var lng = points.lng;
        var lat = points.lat;
        var name = result.name;
        function writeCityInfo(){
            localStorage._userCityeInfo = JSON.stringify({name:name,lng: lng,lat: lat});
            cityName.text(name).attr({lng: lng,lat: lat});
            defaultCity.text(name);
        }
        if(!local_info) {
            writeCityInfo();
        }else{
            //重新定位城市与上次定位不一样，切换城市操作
            if(local_info_J.lng != lng && local_info_J.lat != lat) {
                writeCityInfo();
            }
        }
    }
    var myCity = new BMap.LocalCity();
    myCity.get(indexMapFun);

    $("#enter_cityList").on("click", function () {
        cityBd.css({
            opacity:1,
            webkitTransform:"scale(1)"
        })
    });
    $("#close_cityList").on("click", function () {
        closeCityList()
    });
    _search.on("keyup", function () {
        var keyCode = event.keyCode;
        var val = this.value;
        if(val == ""){
            del.hide();
            qrCode.show()

        }else{
            qrCode.hide();
            del.show();

        }
        //手机search 搜索键keyCode为13   android
        // ios 调不出search键盘 (只对form中的input有效)
        if(keyCode == 13){
            goSearch.trigger("click");
            return false
        }
    });
    del.on("click", function () {
        _search.val("")
    });
    goSearch.on("click", function () {
        var toSearchUrl = "search.html";
        if($.trim(_search.val() != "")){
            toSearchUrl += "?search=" + encodeURI($.trim(_search.val()))
        }
        window.location.href = toSearchUrl;
    });

    function closeCityList(){
        cityBd.show().css({
            webkitTransform:"scale(.6)",
            opacity:0
        });
    }

    $(document).delegates({
        "#city_bd li": function () {
            $("#enter_cityList").find("span").text($(this).text());
            closeCityList()
        }
    });
});