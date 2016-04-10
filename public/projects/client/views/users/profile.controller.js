(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,$rootScope,$routeParams){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.message= null;
        vm.beginEdit=beginEdit;
        vm.save=save;
        vm.cancelEdit=cancelEdit;

        vm.loggedInUser=currentUser._id;

        vm.viewProfileOfUser=$routeParams.userId;
        vm.userdetailsedit =false;

        function init(){

           /* if(vm.loggedInUser===vm.viewProfileOfUser) {

                console.log("the currentUSer", currentUser);
                vm.firstName = currentUser.firstName;
                vm.lastName = currentUser.lastName;
                vm.username = currentUser.username;
                vm.displayName = currentUser.username;
                vm.emails = currentUser.emails.join(",");
            }
            else{

                UserService.getUserById(vm.viewProfileOfUser)
                    .then(function(resposne){
                            vm.firstName = resposne.data.firstName;
                            vm.lastName = resposne.data.lastName;
                            vm.username = resposne.data.username;
                            vm.displayName = resposne.data.username;
                            vm.emails = resposne.data.emails.join(",");
                        },
                        function(error){
                            vm.message="Couldn't find the profile";
                        })
            }*/

            UserService.getUserById(vm.viewProfileOfUser)
                .then(function(response){
                        console.log("response for init()", response);
                        vm.displayName = response.data.firstName;
                        vm.firstName = response.data.firstName;
                        vm.lastName = response.data.lastName;
                        vm.username = response.data.username;
                        vm.emails = response.data.emails.join(",");
                    },
                    function(error){
                        vm.message="Couldn't find the profile";
                    })

        }
        init();


        function beginEdit(){
            vm.userdetailsedit=true;

            vm.displayName = currentUser.firstName;
            vm.firstNameNew = currentUser.firstName;
            vm.lastNameNew = currentUser.lastName;
            vm.usernameNew = currentUser.username;
            vm.passwordNew = currentUser.password;
            vm.emailsNew = currentUser.emails.join(",");
            vm.imageNew = currentUser.image;
        }

        function save(username,password,firstName,lastName,email,image) {

            console.log("last name",lastName);
            if (username == "" || password == "" || firstName == "" || lastName == "" || email == "") {
                vm.message = "Enter all required details";
                vm.userdetailsedit = true;
            }

            else {
                var newDetails = {
                    "username": username, "firstName": firstName,
                    "lastName": lastName, "emails": email.split(","), "password": password
                };

                UserService.profileUpdate(currentUser._id, newDetails)
                    .then(
                        function (response) {
                            UserService.setCurrentUser(response.data);
                            currentUser = $rootScope.currentUser;
                            init();
                            vm.userdetailsedit = false;
                        },
                        function (err) {
                            vm.message = "Couldn't update the profile";
                        });
            }
        }

        function cancelEdit(){
            vm.userdetailsedit=false;
        }
    }
})();
