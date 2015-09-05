define(['baseModel', 'regs', 'loading'], function(BaseModel, Regs, Loading) {
    return BaseModel.extend({
        url: function() {
            return this.urlRoot + 'Message/GetVerificationCode.ashx'
        },
        initialize: function() {
            this.on("invalid", function(model, error) {
                alert(error);
                Loading.hide();
            });
        },
        validate: function(attributes) {
            if (!Regs.phone.test(attributes.mobilenumber)) {
                return "手机号为空或格式不正确！";
            }
        }
    });
});
