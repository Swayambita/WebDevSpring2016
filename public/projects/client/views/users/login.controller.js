(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
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
            console.log("in login",user);
            UserService.login(user)
                .then(function(response){
                        $rootScope.currentUser = response.data;
                        $location.url("/profile/"+response.data._id);
                    },
                    function(err){
                        console.log("error",err);
                        alert("Sorry, couldn't find the user.")
                    }
                );
        }
    }
})();
