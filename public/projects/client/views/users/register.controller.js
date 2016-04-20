(function(){
       "use strict";
        angular.module("EventBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController(UserService,$location,$rootScope) {

        var vm=this;
        vm.register=register;
        vm.message=null;
        function init(){

        }
        init();

        function register(userNew){

            if (userNew == null) {
                vm.message = "Please fill in the required details";
                return;
            }

            if (userNew.username == null) {
                vm.message = "Please enter a valid username";
                return;
            }

            if (userNew.password == null || userNew.password2 == null) {
                vm.message = "Please enter a password";
                return;
            }

            if (userNew.password != userNew.password2) {
                vm.message = "Passwords do not match";
                return;
            }

            if (userNew.email == null) {
                vm.message = "Enter an emailID";
                return;
            }

            UserService.register(userNew)
                .then(function (user){
                        if(user.data!=null){
                            $rootScope.currentUser=user;
                            $location.url("/profile/"+user.data._id);
                        }
                        else{
                            vm.message="Username already exists";
                        }
                    },
                    function (error){
                        console.log(error);
                    })
        }
    }
})();

