/**
 * Created by win8 on 2015/6/25.
 */
jQuery.fn.delegates = function (configs) {
    el = $(this[0]);
    for (var name in configs) {
        var value = configs[name];
        if (typeof value == 'function') {
            var obj = {};
            obj.click = value;
            value = obj;
        };
        for (var type in value) {
            el.delegate(name, type, value[type]);
        }
    }
    return this;
};
function cloneObject(obj) {
    if (typeof obj === "object") {
        if ($.isArray(obj)) {
            var newArr = [];
            for (var i = 0; i < obj.length; i++) newArr.push(obj[i]);
            return newArr;
        } else {
            var newObj = {};
            for (var key in obj) {
                newObj[key] = this.cloneObject(obj[key]);
            }
            return newObj;
        }
    } else {
        return obj;
    }
}
var hosts1 = "http://xiaozuapi.dylkj.cn/API/";

function PageModel(para) {

    var _self = this;
    if (!para.pagingArg) {
        para.pagingArg = {}
    }
    if(!para.data){
        para.data = {};
    }
    para.data.pageIndex = 1;
    _self.pagingRender = false; //删除分页标记
    _self.url = para.url;
    _self.tpl = para.tpl; //tpl 第一个元素表示模版ID， 第二个元素表示容器ID
    if (para.url) {
        _self.get($.extend({
            success: function (data) { }
        }, para || {}));
    }
}
PageModel.prototype = {
    //paraData: null,
    //pageIndex: 1,
    //initListeners: function () { },
    //initPage: function () { },
    Model: {},
    isCoverHtml: true,
    get: function (para) {
        var _self = this;
        var isDone = false;
        if (para.url.indexOf("http://") == -1) {
            para.url = hosts1 + para.url
        }
        if($("#prompt-box")[0]){
            $("#prompt-box").remove()
        }
        $.ajax({
            async: false,
            url: para.url,
            data: para.data || '',
            type: para.type || 'get',
            dataType: para.dataType || "jsonp",
            jsonp: 'jsoncallback',
            cache: true,
            timeout: para.timeout || 8000,
            beforeSend: function () {
                if (para.beforeSend) {
                    para.beforeSend.call(_self);
                } else {
                    _self.showLoad(function () {
                        return isDone;
                    }, 250);
                }

            },
            error: function (data, errorInfo, errorObj) {
                //执行程序容错处理
                if (para.error) para.error(data, errorInfo, errorObj);
                Global.tool.messPop({ content: "数据请求失败" })
            },
            success: function (strJson) {
                var d;
                if (typeof strJson == "object") {
                    d = strJson
                }
                _self.Model = d;

                //是否有数据
                if (d.IsSuccessfully || d.IsAuthentication || para.beforeSend) {
                    if (_self.tpl) {
                        _self.render();
                        //分页判断
                        if (para.pagingArg.paging) {
                            _self.pageData = para;
                            _self.pagingFun();
                        }
                    }
                    if (para.success) {
                        para.success.call(_self, d);
                    }
                } else {
                    if(d.LoginState == false){
                        localStorage.login_toUrl = JSON.stringify(window.location.href);
                        window.location.href = urlRoot + "pages/user/login.html";
                        return
                    }
                    Global.tool.messPop({ content: d.ErrorMessage });
                }
            },
            complete: function (data) {
                isDone = true;
                if (para.complete) para.complete();
            }
        });
    },
    //数据加载中效果
    showLoad: function (fn, time) {
        var _self = this;
        if ($("#loadBG").size() == 0) {
            $("body").append("<div id='loadBG' class='loadBG'></div>");
        }
        if (fn) {
            var timer = window.setInterval(function () {
                if (fn.call(_self)) {
                    _self.clearLoad();
                    window.clearInterval(timer);
                }
            }, time || 200);
        }
    },
    //清除加载效果
    clearLoad: function () {
        $("#loadBG").remove();
        //$("#loadBG").fadeOut("fast", function () { $(this).remove(); });
    },
    //渲染模版数据
    render: function (data) {
        var _self = this;
        var html = template(_self.tpl[0], _self.Model);
        if (!_self.pagingRender) {
            $("#" + _self.tpl[1]).html(html);
        } else {
            $("#" + _self.tpl[1]).append(html);
        }
    },
    /**
     * 分页触发方式
     * 滚动条滑动到底部自动加载
     */
    pagingFun: function () {
        var _self = this;
        var otherHeight = 0;
        if (_self.pageData.pagingArg.otherHeight) {
            for (var i in _self.pageData.pagingArg.otherHeight) {
                otherHeight += parseInt($(_self.pageData.pagingArg.otherHeight[i]).height())
            }
        }
        var scroller = $("#" + _self.tpl[1]);
        console.log();
        scroller.parent().off("scroll").on("scroll", function () {
            var maxBottom = scroller.height() + otherHeight - $(this).height();
            if (Math.abs($(this).scrollTop()) >= Math.abs(maxBottom)) {
                ++_self.pageData.data.pageIndex;
                _self.pagingRender = true;//分页渲染标记
                _self.get(_self.pageData);
            }
        })
    }

};

/**
 *  获取地址栏search 数据
 * @param key   查询的key
 * @returns {*} 返回key值
 */

function getSearchValue(key) {
    var ss = window.location.search;
    if (ss) {
        var arr1 = ss.substring(1).split("&");
        for (var i in arr1) {
            if (arr1[i].indexOf(key) != -1) {
                return decodeURI(arr1[i].split("=")[1]);
            }
        }
    }
}

//页面跳转
$(document).delegates({
    ".gohref": function () {
        window.location.href = $(this).attr("gohref")
    }
});

$(function () {
    $("#goback").click(function () {
        window.history.go(-1)
    })
});

