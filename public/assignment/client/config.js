(function() {
    "use strict";
    angular.module("FormBuilderApp")
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

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkAdmin
                }
            })

            .when("/form", {
                templateUrl: "views/forms/forms.view.html",
                controller:"FormController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkLoggedin
                }

            })

            .when("/forms/:formId/fields", {
                templateUrl: "views/forms/field.view.html",
                controller:"FieldController",
                controllerAs:"model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs: "model"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html",
                 controller:"LoginController",
                 controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve :{
                    loggedin:checkLoggedin
                }
            })

            .when("/username", {
                templateUrl: "views/users/profile.view.html",
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