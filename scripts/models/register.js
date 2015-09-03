define(['backbone', 'regs'], function(Backbone, Regs){
	return Backbone.Model.extend({
		url : 'User/RegisterStep1.ashx',
		initialize:function(){
			this.on("invalid",function(model,error){
	            alert(error);
	        });
		},
		validate:function(attributes){
	        if(!Regs.phone.test(attributes.mobilenumber)) {
	            return "手机号为空或格式不正确！";
	        }

	        if(attributes.password == '' || attributes.password.length < 6) {
	            return "密码为6-18位字符，请检查！";
	        }
	    }
	});
});