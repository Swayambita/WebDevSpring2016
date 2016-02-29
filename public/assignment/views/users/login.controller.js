(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,UserService,$rootScope){
        $scope.login = login;
        $scope.message=null;

        function login(user)
        {
            // need to include the callback parameter
            UserService.findUserByCredentials(user.username,user.password,render);

            function render(user){
               if(user){
                   $rootScope.currentUser=user;
                  // UserService.setCurrentUser(user);
                   $scope.message="Username and password  match";
                   $location.url("/profile");

               }
                else{
                   $scope.message="Username and password doesnot match";
               }
            }
        }
    }
})();

