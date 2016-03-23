(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService){
        var vm=this;
        vm.login=login;
        vm.message=null;

        console.log("hola");
        function init(){
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            console.log("am in controller");
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else{
                        vm.message="Username and password doesnot match";
                    }
                });
        }
    }
})();

