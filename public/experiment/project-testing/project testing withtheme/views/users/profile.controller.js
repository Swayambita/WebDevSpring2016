(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$rootScope){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.message= null;
        vm.update=update;

        // vm.user = currentUser;

        vm.firstName=currentUser.firstName;
        vm.lastName=currentUser.lastName;
        vm.username=currentUser.username;
        vm.password=currentUser.password;
        vm.email=currentUser.email;

        function init(){

        }
        init;

        function update(username,password,firstName,lastName,email){
            var newDetails= {"_id":currentUser._id, "username" : username, "firstName": firstName,
                "lastName":lastName , "email" :email ,"password" :password};
            UserService.profileUpdate(currentUser._id,newDetails)
                .then(
                    function(response){
                        console.log("response from server",response.data);
                        if(response){
                            UserService.setCurrentUser(response.data);
                            vm.message="Profile Updated";
                        }
                        else{
                            vm.message="Couldn't update the profile beca";
                        }
                    }
                );
        }
    }
})();
