define(['backbone', 'views/homeView', 'views/loginView', 'views/registerView', 'views/findPasswordView', 'views/changePasswordView'], 
    function(Backbone, HomeView, LoginView, RegisterView, FindPasswordView, ChangePasswordView) {
    return Backbone.Router.extend({
        routes: {
            "": "login",
            "home": "home",
            "login": "login",
            "register":"register",
            "findPassword": "findPassword",
            'changePassword' : 'changePassword'
        },
        initialize:function(){
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
        },
        index: function() {
            app.navigate('#home', {trigger: true});
        },
        home: function(){
            this.changePage(new HomeView());
        },
        login: function() {
            this.changePage(new LoginView());
        },
        register:function() {
            this.changePage(new RegisterView());
        },
        findPassword: function(){
            this.changePage(new FindPasswordView());
        },
        changePassword: function(){
            this.changePage(new ChangePasswordView());
        },
        changePage: function(page) {
            $(page.el).attr('data-role', 'page');
            page.render();
            var body = $('body');
            body.html($(page.el));

            // if(body.find('.gf-footer').length <= 0){
            //     body.append(_.template(footer));
            // }
            // if($(page.el).hasClass('loginPage') || $(page.el).hasClass('registerPage')){
            //     body.find('.gf-footer').remove();
            // }
            
            // var transition = $.mobile.defaultPageTransition;
            // We don't want to slide the first page
            if (this.firstPage) {
                // transition = 'none';
                this.firstPage = false;
            }
            // $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
        }
    });
});