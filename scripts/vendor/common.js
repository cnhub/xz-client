define(['jquery'], function(){
	var Common = {
		base : 'http://xiaozuapi.dylkj.cn/API/',
		sendToServer: function(opt) {
			console.log(arguments);
		    var url, type, _this;
		    _this = this;
		    var loading = '<div class="m-loading"><ul><li></li><li></li><li></li></ul></div>';
		    loading = $(loading).appendTo($('body'));

		    return $.ajax({
		        type: opt.type,
		        url: opt.url,
		        data: opt.data,
		        timeout: 30000,
		        dataType: opt.dataType
		    }).done(function(response) {
		        // if (response.IsSuccessfully) {
		        // 	console.log(opt.success);
		        //     opt.success && opt.success(response);
		        // } else {
		        // 	alert(response.ErrorMessage);
		        //     opt.error && opt.error(response);
		        // }
		        // loading.remove();
		    }).fail(function(xhr, ajaxOptions, thrownError) {
		        loading.remove();
		        // alert('error code: ' + xhr.status + '\n ajaxOptions:' + ajaxOptions + '\n message: ' + thrownError + '\n APIName:' + opt.apiName);
		    });
		},
		formatDate:function(date){
			var today = new Date();
			var weekStr = '日一二三四五六';
			if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate()){
				return '今天 周' + weekStr[date.getDay()];
			}else if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate() + 1){
				return '明天 周' + weekStr[date.getDay()];
			}else if(date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate() + 2){
				return '后天 周' + weekStr[date.getDay()];
			}else{
				return (date.getMonth()+1) + '月' + date.getDate() + '日 周' + weekStr[date.getDay()];
			}
		},
		formatTime:function(timestamp, isShort){
			var time = new Date(+timestamp);
			var year = time.getFullYear();
			var month = time.getMonth()+1;
			var day = time.getDate();
			var hour = time.getHours();
			var min = time.getMinutes();
			var sec = time.getSeconds();

			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hour = hour < 10 ? '0' + hour : hour;
			min = min < 10 ? '0' + min : min;
			sec = sec < 10 ? '0' + sec : sec;

			return isShort? year + '年' + month + '月' + day + '日' : year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + min + ':' + sec;
		},
		getPosition:function(){
			navigator.geolocation.getCurrentPosition(function(position){
				localStorage.setItem('position', position.coords.longitude + ',' + position.coords.latitude);
			}, function(error){
				console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
			});
		},
		bindEvents:function(){
		},
		init:function(){
			this.bindEvents();
		}
	}
	Common.init();
	window.Common = Common;
});