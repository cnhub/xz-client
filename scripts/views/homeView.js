define(['backbone', 'loading', 'text!templates/home.html', 'models/home', 'models/address'], function(Backbone, Loading, HomeTmp, HomeModel, AddressModel) {
    return Backbone.View.extend({
        className: 'homePage',
        template: _.template(HomeTmp),
        events: {
            'click #close_cityList': 'closeCityList',
            'click #enter_cityList': 'openCityList',
            'click  #city_bd li': 'selectedCityList'
        },
        render: function() {
            this.$el.html(this.template);
            this.GetAddress();
            return this;
        },
        openCityList: function(e) {
            e.preventDefault();
            this.$el.find("#city_bd").css({
                opacity: 1,
                webkitTransform: "scale(1)"
            })
        },
        closeCityList: function() {
            this.$el.find("#city_bd").show().css({
                webkitTransform: "scale(.6)",
                opacity: 0
            });
        },
        selectedCityList: function(e) {
            var target = $(e.currentTarget);
            this.$el.find("#enter_cityList").find("span").text(target.text()).attr('data-id', target.attr('data-id'));
            this.closeCityList();
        },
        GetAddress: function() {
            var _this = this;
            var model = new AddressModel();
            var AddressTmp = '<%_.each(AddressList,function(item){%>\
        						<li class="table-view-cell" data-id="<%=item.AreaID%>">\
        							<%=item.AreaName%>\
        						</li>\
        					<%})%>;';
            model.save(null, {
                data: model.attributes,
                cache: false,
                success: function(model, response, options) {
                    localStorage.clear();
                    if (!response.IsSuccessfully) {
                        alert(response.ErrorMessage);
                        return;
                    }
                    _this.cityData = response.AddressList;
                    _this.$el.find('#cityListWraper').html(_.template(AddressTmp)(response));
                    _this.getPosition();
                    Loading.hide();
                },
                error: function(model, response, options) {
                    alert('status: ' + response.status + '\nstatusText:' + response.statusText);
                    Loading.hide();
                }
            });
        },
        login: function(e) {
            var _this = this;
            e.preventDefault();
            var model = new LoginModel({
                mobilenumber: $.trim(_this.$el.find('#phone').val()),
                password: $.trim(_this.$el.find('#pwd').val())
            });
            model.save(null, {
                data: model.attributes,
                cache: false,
                success: function(model, response, options) {
                    localStorage.clear();
                    if (!response.IsSuccessfully) {
                        alert(response.ErrorMessage);
                        return;
                    }
                    localStorage.setItem('mobilenumber', model.get('mobilenumber'));
                    localStorage.setItem('password', model.get('password'));
                    localStorage.setItem('UserID', response.UserID);
                    alert('登录成功！');
                    Loading.hide();
                    app.navigate('#home', {
                        trigger: true
                    });
                },
                error: function(model, response, options) {
                    localStorage.clear();
                    alert('status: ' + response.status + '\nstatusText:' + response.statusText);
                    Loading.hide();
                }
            });
        },
        getPosition: function() {
            var _this = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                localStorage.setItem('position', position.coords.longitude + ',' + position.coords.latitude);
                _this.parseAddress();
            }, function(error) {
                console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            });
        },
        getCityIdByName: function(name){
        	var data = this.cityData;
        	var result = _.filter(data, function(city){
        		return city.AreaName.indexOf(name) != -1;
        	});
        	console.log(result);
        	if(!result || result.length <= 0){
        		alert('未匹配到您所在城市！');
        		return;
        	}
        	this.$el.find("#user_cityName").text(result[0].AreaName).attr('data-id', result[0].AreaID);
        	this.$el.find("#user_defaultCity").text(result[0].AreaName).attr('data-id', result[0].AreaID);
        	localStorage.setItem('currentCity', JSON.stringify(result[0]));
        },
        parseAddress: function() {
            var _this = this;
            var position = localStorage.getItem('position');
            if (!position || position.length < 0) {
                return;
            }
            _this.position = position;
            var center = new BMap.Point(position.split(',')[0], position.split(',')[1]);
            var myGeo = new BMap.Geocoder();
            // 根据坐标得到地址描述    
            myGeo.getLocation(center, function(result) {
                if (result) {
                    var city = result.addressComponents.city.substr(0, result.addressComponents.city.length - 1);
                    _this.getCityIdByName(city);
                }else{
                	console.log('解析地址失败！');
                }
            });
        },
    });
});
