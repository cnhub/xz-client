define([], function() {
    var regs = {
        phone: /^1[3|4|5|7|8|9]\d{9}$/,
        verCode: /^\d{4,6}$/,
        realName: /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,10}$/,
        uname: /^([a-z_A-z-\u4E00-\u9FA5\uF900-\uFA2D]+\d*)|(\d*[a-z_A-z-\u4E00-\u9FA5\uF900-\uFA2D]+)$/,
        enterpriceName: /^[\u4E00-\u9FA5\uF900-\uFA2D]{4,50}$/,
        pwd: /[a-z_A-z0-9@#\.-]/,
        id: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        icrn: /^\d{15}$/, //工商注册号,
        checkId: function(g) {
            var f = 0;
            var a = g;
            var e = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙",
                21: "辽宁",
                22: "吉林",
                23: "黑龙",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            };
            if (!/^\d{17}(\d|x)$/i.test(a)) {
                return false
            }
            a = a.replace(/x$/i, "a");
            if (e[parseInt(a.substr(0, 2))] == null) {
                return false
            }
            var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
            var h = new Date(c.replace(/-/g, "/"));
            if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
                return false
            }
            for (var b = 17; b >= 0; b--) {
                f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
            }
            if (f % 11 != 1) {
                return false
            }
            return true
        }
    };
    return regs;
});
