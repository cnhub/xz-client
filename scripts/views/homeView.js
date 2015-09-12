define(['backbone', 'loading', 'text!templates/home.html', 'models/home', 'models/address', 'models/workItems', 'models/services'], function(Backbone, Loading, HomeTmp, HomeModel, AddressModel, WorkItemsModel, ServicesModel) {
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
                },
                error: function(model, response, options) {
                    alert('status: ' + response.status + '\nstatusText:' + response.statusText);
                    Loading.hide();
                }
            });
        },
        getPosition: function() {
            var _this = this;
            var geolocation = new BMap.Geolocation();        
            geolocation.getCurrentPosition(function(r) {
                Loading.hide();
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    console.log('location ok', r.point.lng, r.point.lat);
                    var Position = localStorage.getItem('Position');
                    if(Position && Position.length > 0){
                        Position = JSON.parse(Position);
                        if(!Position.accuracy || Position.accuracy <= r.accuracy){
                            _this.getCityIdByName(r.address.city);
                            console.log('location start updated!');
                        }else{
                            console.log('location not necessary updated!');
                        }
                    }else{
                        _this.getCityIdByName(r.address.city);
                        console.log('last location is empty,current updated!');
                    }
                    console.log(r.address.province + ", " + r.address.city + ", " + r.address.district + ", " + r.address.street + ", " + r.address.street_number);
                    console.log('position', r);
                    localStorage.setItem('Position', JSON.stringify(r));
                } else {
                    console.log('failed' + this.getStatus());
                    alert('failed' + this.getStatus());
                    return;
                }
            }, {
                enableHighAccuracy: true
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
        getWorkItems: function(){
            var _this = this;
            var model = new WorkItemsModel({});
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
                },
                error: function(model, response, options) {
                    alert('status: ' + response.status + '\nstatusText:' + response.statusText);
                    Loading.hide();
                }
            });
        },
        GetServices: function(){
            var _this = this;
            var model = new ServicesModel({
                    pageindex:1,
                    pagesize:10,
                    areaID:110000,
                    unitPriceRange1:0,
                    unitPriceRange2:0,
                    ageRange1:0,
                    ageRange2:0,
                    heightRange1:0,
                    heightRange2:0,
                    isAudit:true,
                    isValid:true,
                    workItemsArray:'',
                    keyWords:''
            });
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
                },
                error: function(model, response, options) {
                    alert('status: ' + response.status + '\nstatusText:' + response.statusText);
                    Loading.hide();
                }
            });
        }
    });
});
