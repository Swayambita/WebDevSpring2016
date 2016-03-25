
(function() {
    "use strict";
    angular.module("EventBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController",
                controllerAs:"model"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs:"model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model"
            })

            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model"
            })

            .when("/search/:someEvent", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model"

            })

            .when("/search/:someEvent/:someLocation", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController",
                controllerAs:"model"
            })

            .when("/createEvent", {
                templateUrl: "views/createEvent/createEvent.view.html",
                controller:"CreateEvent",
                controllerAs:"model"
            })

            .when("/details/:eventID",{
                templateUrl:"views/details/details.view.html",
                controller:"DetailsController"
            })

            .when("/myEvents",{
                templateUrl:"views/users/myEvents.view.html",
                controller:"MyEvents",
                controllerAs:"model"
            })

            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model"
            })

            .otherwise({
                redirectTo: "/home"
            })
    }
})();