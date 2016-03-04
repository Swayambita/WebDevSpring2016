(function(){
       "use strict";
        angular.module("EventBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,UserService,$rootScope,$location) {

        $scope.register = register;
        $scope.message=null;

        function register(user) {

            if(user == null) {
                $scope.message = "Please fill in the required details";
                return;
            }

            if (user.username == null) {
                $scope.message = "Please enter a valid username";
                return;
            }

            if (user.password == null || user.password2 == null) {
                $scope.message = "Please enter a password";
                return;
            }

            if (user.password != user.password2) {
                $scope.message = "Passwords do not match";
                return;
            }

            if (user.email == null) {
                $scope.message = "Enter an emailID";
                return;
            }

            UserService.createUser(user, render);


            function render(newuser) {
                UserService.setCurrentUser(newuser);
                $location.url("/profile");
            }
        }
    }
})();

