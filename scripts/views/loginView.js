define(['backbone', 'loading', 'text!templates/login.html', 'models/login'], function(Backbone, Loading, LoginTmp, LoginModel){
	return Backbone.View.extend({
		className: 'loginPage',
		template:_.template(LoginTmp),
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
			model.save(null, {
				success:function(model, response, options){
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
					app.navigate('#home', {trigger: true});
			    },
			    error:function(model, response, options){
			    	localStorage.clear();
			    	alert('status: ' + response.status + '\nstatusText:' + response.statusText);
			    	Loading.hide();
			    }
			});
		}	
	});
});