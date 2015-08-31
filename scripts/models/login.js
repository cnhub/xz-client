define(['backbone'], function(Backbone){
	return Backbone.Model.extend({
		initialize:function(){
			this.on("invalid",function(model,error){
	            alert(error);
	        });
		},
		validate:function(attributes){
	        if(attributes.name == '') {
	            return "手机号不能为空！";
	        }

	        if(attributes.pwd == '') {
	            return "密码不能为空！";
	        }
	    },
	    save:function(opt){
	    	opt.data = this.attributes;
	    	window.Common.sendToServer(opt);
	    }
	});
});