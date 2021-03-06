define(['baseModel', 'regs', 'loading'], function(BaseModel, Regs, Loading) {
    return BaseModel.extend({
        url: function() {
            return this.urlRoot + '/Service/GetServices.ashx'
        },
        initialize: function() {
            this.on("invalid", function(model, error) {
                alert(error);
                Loading.hide();
            });
        },
        validate: function(attributes) {
        }
    });
});
