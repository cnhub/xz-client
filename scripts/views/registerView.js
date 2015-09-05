define(['backbone', 'loading', 'text!templates/register.html', 'models/register', 'models/verificationCode'], function(Backbone, Loading, RegisterView, RegisterModel, VerificationCodeModel){
	return Backbone.View.extend({
		className: 'registerPage',
		template:_.template(RegisterView),
		events:{
			'click #registerSub': 'register',
			'click #getPhoneCode': 'getVerificationCode'
		},
		render:function(){
			this.$el.html(this.template);
			return this;
		},
		getVerificationCode: function(e){
			var _this = this;
			e.preventDefault();
			var model = new VerificationCodeModel({
					mobilenumber: $.trim(_this.$el.find('#phone').val())
				});
			Loading.show();
			model.save(null, {
				success:function(model, response, options){
					if (!response.IsSuccessfully) {
						alert(response.ErrorMessage);
						return;
					}
					alert('验证码发送成功！');
					Loading.hide();
			    },
			    error:function(model, response, options){
			    	alert('status: ' + response.status + '\nstatusText:' + response.statusText);
			    	Loading.hide();
			    }
			});
		},
		register:function(e){
			var _this = this;
			e.preventDefault();
			var model = new RegisterModel({
					mobilenumber: $.trim(_this.$el.find('#phone').val()), 
					password: $.trim(_this.$el.find('#pwd').val()),
					rePassword: $.trim(_this.$el.find('#rePwd').val()),
					code:$.trim(_this.$el.find('#code').val())
				});
			model.save(null, {
				success:function(model, response, options){
					localStorage.clear();
					if (!response.IsSuccessfully) {
						alert(response.ErrorMessage);
						return;
					}
					alert('注册成功，即将跳转到登录页面！');
					app.navigate('#login', {trigger: true});
			    },
			    error:function(){
			    	localStorage.clear();
			    }
			});
		}	
	});
});