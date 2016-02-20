(function() {
    "use strict";
    angular.module("FormBuilderApp")
        .config(Configure);


    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"
            })

            .when("/form", {
                templateUrl: "views/forms/forms.view.html",
                controller:"views/forms/controller.js"
            })

            .when("/fields", {
                templateUrl: "views/forms/fields.view.html"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController"
            })

            .when("/username", {
                templateUrl: "views/users/profile.view.html"
            })
    }
})();