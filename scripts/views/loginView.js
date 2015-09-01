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
			var _this = this;
			e.preventDefault();
			var model = new LoginModel({
					mobilenumber: $.trim(_this.$el.find('#phone').val()), 
					password: $.trim(_this.$el.find('#pwd').val())
				});
			model.save({
				apiName:'User/Authentication.ashx',
				success:function(response){
					localStorage.clear();
					localStorage.setItem('mobilenumber', model.get('mobilenumber'));
					localStorage.setItem('password', model.get('password'));
					localStorage.setItem('uid', response.uid);
					alert('登录成功！');
					app.navigate('#home', {trigger: true});
			    },
			    error:function(){
			    	localStorage.clear();
			    }
			});
		}	
	});
});