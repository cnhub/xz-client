define(['backbone', 'appRouter'], function (Backbone, appRouter) {
	var init = function(){
	    window.app = new appRouter();
	    Backbone.history.start();
	}
	return {
		initialize: init
	}
});