
(function() {
    "use strict";
    angular.module("EventBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"
            })

            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:"SearchController"
            })

            .when("/createEvent", {
                templateUrl: "views/createEvent/createEvent.view.html",
                controller:"CreateEvent"
            })

            .otherwise({
                redirectTo: "/home"
            })
    }
})();