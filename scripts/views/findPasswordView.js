define(['backbone', 'loading', 'regs', 'text!templates/findPassword.html', 'models/verificationCode'], function(Backbone, Loading, Regs, FindPasswordView, VerificationCodeModel){
	return Backbone.View.extend({
		className: 'findPasswordPage',
		template:_.template(FindPasswordView),
		events:{
			'click #submit': 'submit',
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
					_this.code = response.Code;
					alert('验证码发送成功！');
					Loading.hide();
			    },
			    error:function(model, response, options){
			    	alert('status: ' + response.status + '\nstatusText:' + response.statusText);
			    	Loading.hide();
			    }
			});
		},
		submit: function(){
			var _this = this;
			var mobilenumber =  $.trim(this.$el.find('#phone').val()),
				code = $.trim(_this.$el.find('#code').val());
			;
			if (!Regs.phone.test(mobilenumber)) {
                alert("手机号为空或格式不正确！");
                return;
            }
            if(!Regs.verCode.test(code)) {
                alert("验证码为空为或格式不正确！");
                return;
            }
            if(this.code &&  this.code != code) {
                alert("验证码错误！");
                return;
            }
           
            app.navigate('#changePassword', {trigger: true});
		}
	});
});