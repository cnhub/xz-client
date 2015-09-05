define(['backbone', 'loading'], function(Backbone, Loading) {
    return Backbone.Model.extend({
        urlRoot: 'http://xiaozuapi.dylkj.cn/API/'
    });
});
