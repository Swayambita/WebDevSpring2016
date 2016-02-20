(function(){
    "use strict";
        angular.module("FormBuilderApp",[])
        .controller("RegisterController",RegisterController);

    function RegisterController($scope){

        var name=$scope.username;
        var password=$scope.password;

        //inject UserService()

        function register(){

            //use UserService to create new user
        }

    }

})();

