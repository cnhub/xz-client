define(['backbone', 'text!templates/login.html', 'models/login'], function(Backbone, LoginView, LoginModel){
	return Backbone.View.extend({
		className: 'loginPage',
		template:_.template(LoginView),
		events:{
			'click #submit': 'login'
		},
		render:function(){
			this.$el.html(this.template);
			return this;
		},
		login:function(e){
			e.preventDefault();
			var model = new LoginModel({
					phone: $.trim($('#name').val()), 
					pwd: $.trim($('#pwd').val())
				});
			model.save({
				apiName:'Home/Login/login_interface',
				success:function(response){
					localStorage.clear();
					localStorage.setItem('phone', model.get('phone'));
					localStorage.setItem('password', model.get('pwd'));

					localStorage.setItem('uid', response.uid);
					app.navigate('#home', {trigger: true});
			    },
			    error:function(){
			    	localStorage.clear();
			    }
			});
		}	
	});
});