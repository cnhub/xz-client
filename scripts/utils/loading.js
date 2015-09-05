define(['jquery'], function(){
	return {
		show: function(){
			var template = '<div class="m-loading"><ul><li></li><li></li><li></li></ul></div>';
			this.loading = $(template).appendTo($('body'));
		},
		hide: function(){
			this.loading.remove();
		}
	};
});