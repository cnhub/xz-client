define(['backbone', 'appRouter'], function (Backbone, appRouter) {
	var init = function(){
	    window.app = new appRouter();
	    Backbone.history.start();
	    Backbone.ajax = window.Common.sendToServer.bind(window.Common);
	}
	return {
		initialize: init
	}
});