(function(){
    "use strict";
        angular.module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope){

        var name=$scope.username;
        var password=$scope.password;

        // event handlers initialization
        //$scope.register=register()

        //inject UserService()

        // event handlers implementation
        function register(){

            //use UserService to create new user
        }

    }

})();

