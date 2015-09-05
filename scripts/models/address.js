define(['baseModel', 'regs', 'loading'], function(BaseModel, Regs, Loading) {
    return BaseModel.extend({
        url: function() {
            return this.urlRoot + '/Common/GetAddress.ashx'
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
