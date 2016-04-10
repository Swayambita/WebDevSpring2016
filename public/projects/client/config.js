
(function() {
    "use strict";
    angular.module("EventBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller:"HomeController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkCurrentUser
                }

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

            .when("/profile/:userId", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/search", {
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
                controllerAs:"model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/details/:eventID",{
                templateUrl:"views/details/details.view.html",
                controller:"DetailsController",
                controllerAs:"model"
            })

            .when("/myEvents",{
                templateUrl:"views/users/myEvents.view.html",
                controller:"MyEvents",
                controllerAs:"model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/admin",{
                templateUrl:"views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkAdmin
                }
            })

            .when("/favouriteEvents",{
                templateUrl:"views/users/favouriteEvents.view.html",
                controller:"FavouriteEventsController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .otherwise({
                redirectTo: "/home"
            })
    }


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();