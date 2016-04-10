(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("ProfileController",ProfileController);


    function ProfileController(UserService,$rootScope){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.message= null;
        vm.firstName=currentUser.firstName;
        vm.lastName=currentUser.lastName;
        vm.username=currentUser.username;
        vm.password=currentUser.password;
        vm.email=currentUser.emails.join(",");
        vm.phones=currentUser.phones.join(",");
        vm.update=update;

        function init(){

        }
        init;

        function update(username,password,firstName,lastName,email,phones){
            var newDetails= {"username" : username, "firstName": firstName,
                "lastName":lastName , "email" :email.split(",") ,"phones" :phones.split(",") ,"password" :password};
            UserService.updateUser(newDetails,currentUser._id)
                .then(
                    function(response){
                        $rootScope.currentUser=response.data;
                            vm.message="Profile Update";
                        },
                    function(err){
                            vm.message="Couldn't update the profile";
                        });
        }
    }
})();


