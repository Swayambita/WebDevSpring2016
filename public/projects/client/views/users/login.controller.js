(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController(UserService,$location) {
        var vm = this;
        vm.login = login;
        vm.message = null;

        function init() {
        }

        init();

        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function (user){
                        if(user.data!=null) {
                            console.log("currentuser",user.data);
                            UserService.setCurrentUser(user.data);
                            $location.url("/profile/"+user.data._id);
                        }
                        else{
                            vm.message="Username and password doesnot match";
                        }
                    },
                    function (error){
                        vm.message="Username and password doesnot match";
                    })
        }
    }
})();
