// var $ = require('jquery');
var Utils = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        var _this = this;
    }
};

if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
        return Utils;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
} else {
    window.Utils = Utils;
}