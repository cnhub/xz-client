define(['backbone', 'loading', 'text!templates/changePassword.html', 'models/changePassword',], function(Backbone, Loading, ChangePasswordTmp, ChangePasswordModel){
	return Backbone.View.extend({
		className: 'changePasswordPage',
		template:_.template(ChangePasswordTmp),
		events:{
			'click #submit': 'submit',
		},
		render:function(){
			this.$el.html(this.template);
			return this;
		},
		submit: function(){
			var _this = this;
			var model = new ChangePasswordModel({
					userID: localStorage.getItem('userID'),
					password: $.trim(_this.$el.find('#pwd').val()),
					rePassword: $.trim(_this.$el.find('#rePwd').val()),
				});
			Loading.show();
			model.save(null, {
				success:function(model, response, options){
					if (!response.IsSuccessfully) {
						alert(response.ErrorMessage);
						return;
					}
					alert('密码修改成功成功！');
					Loading.hide();
					app.navigate('#login', {trigger: true});
			    },
			    error:function(model, response, options){
			    	alert('status: ' + response.status + '\nstatusText:' + response.statusText);
			    	Loading.hide();
			    }
			});
		}
	});
});