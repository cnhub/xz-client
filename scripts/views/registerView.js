define(['backbone', 'text!templates/register.html', 'models/register'], function(Backbone, RegisterView, RegisterModel){
	return Backbone.View.extend({
		className: 'registerPage',
		template:_.template(RegisterView),
		events:{
			'click #registerSub': 'register'
		},
		render:function(){
			this.$el.html(this.template);
			return this;
		},
		register:function(e){
			var _this = this;
			e.preventDefault();
			var model = new RegisterModel({
					mobilenumber: $.trim(_this.$el.find('#phone').val()), 
					password: $.trim(_this.$el.find('#rePwd').val()),
					code:$.trim(_this.$el.find('#code').val())
				});
			model.save({
				apiName:'User/RegisterStep1.ashx',
				success:function(response){
					localStorage.clear();
					alert('注册成功！');
					app.navigate('#login', {trigger: true});
			    },
			    error:function(){
			    	localStorage.clear();
			    }
			});
		}	
	});
});