(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService,$location,$rootScope) {
        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {
        }

        init();

        function login(user) {
            if(!user){
                vm.message = "Please enter login details";
                return;
            }
            UserService.login(user)
                .then(function(response){
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    },
                    function(err){
                        vm.message = "username or password not found";
                    }
                );
        }
    }
})();

