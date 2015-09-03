requirejs.config({
    baseUrl: "scripts",
    paths: {
        jquery: 'vendor/jquery-2.1.4.min',
        backbone: 'vendor/backbone-min',
        underscore:'vendor/underscore-min',
        text:'vendor/text',
        swipe: 'vendor/swipe',
        fastclick: 'vendor/fastclick',
        common: 'vendor/common',
        regs: 'vendor/regs'
    },
    shim:{
        underscore:{
            exports:'_'
        }
    }
});

requirejs(['app', 'common'], function(app){
        var os = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        os = false; //用于微信、浏览器等环境
        if ( os ) {
            // PhoneGap application
            // requirejs(['cordova'], function(){
            //     document.addEventListener('deviceready', onDeviceReady, false);
            //     function onDeviceReady () {
            //         function dialog(title, buttonName){
            //             buttonName = buttonName || '确定';
            //             navigator.notification.alert(
            //                 title,                 // message
            //                 function(){},         // callback
            //                 '提示信息',            // title
            //                 buttonName            // buttonName
            //             );
            //         }
            //         window.alert = dialog;
            //         app.initialize();
            //     }
            // });
        } else {
            // Web page
            console.log('您当前使用的平台非app,已自动进入dev模式！');
            app.initialize();
        }
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        alert('当前网络不稳定，加载超时，请重试！');
        console.log('modules: ' + err.requireModules);
    }
    throw err;
};