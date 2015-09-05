define(['baseModel', 'regs', 'loading'], function(BaseModel, Regs, Loading) {
    return BaseModel.extend({
        url: function() {
            return this.urlRoot + 'ChangePassword.ashx'
        },
        initialize: function() {
            this.on("invalid", function(model, error) {
                alert(error);
                Loading.hide();
            });
        },
        validate: function(attributes) {
            if(attributes.password == '' || attributes.password.length < 6) {
                return "密码为6-18位字符，请检查！";
            }

            if(attributes.password != attributes.rePassword) {
                return "两次密码不一致，请检查！";
            }

            if(attributes.userID == null || attributes.userID.length <= 0) {
                return "用户ID不存在，请重新登录！";
            }
        }
    });
});
