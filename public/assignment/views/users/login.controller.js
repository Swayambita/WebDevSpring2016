(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,UserService){
        $scope.$location = $location;

        function login(username,password)
        {
            alert("hello");
            // need to include the callback parameter
           var user_authen= UserService.findUserByCredentials(username,password);
            if(user_authen!=null){
                 console.log("yeaaaaa");
            }
            else{
                console.log("naaaaa");
            }
        }
    }
})();

