(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,UserEventService,$rootScope,$routeParams){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        var profileUser=$routeParams.userId;
        var loggedInUserName=currentUser.username;
        var userName=null;
        var newDetails=null;

        vm.beginEdit=beginEdit;
        vm.save=save;
        vm.cancelEdit=cancelEdit;
        vm.message= null;
        vm.loggedInUser=currentUser._id;
        vm.viewProfileOfUser=$routeParams.userId;
        vm.userdetailsedit =false;
        vm.followUser=followUser;
        vm.unFollowUser=unFollowUser;


        function init(){
            UserService.getUserById(vm.viewProfileOfUser)
                .then(function(response){
                        vm.displayName = response.data.username;
                        vm.firstName = response.data.firstName;
                        vm.lastName = response.data.lastName;
                        vm.username = response.data.username;
                        vm.emails = response.data.emails.join(",");
                        vm.message=null;
                        userName=response.data.username;

                        UserService.getMyFollowers(vm.viewProfileOfUser)
                            .then(function(response){
                                    vm.myFollowers=response.data;
                                },
                                function(error){
                                    console.log("Error",error);
                                });

                        UserService.getWhomAmFollowing(vm.viewProfileOfUser)
                            .then(function(response){
                                    vm.iFollow=response.data;
                                },
                                function(error){
                                });

                        UserEventService.findEventsFoCurrentUser(vm.viewProfileOfUser)
                            .then(function(response){
                                    vm.userEvents=response.data;
                                },
                                function(err){
                                    console.log("Error while fetching events created by user");
                                })

                    },
                    function(error){
                        console.log("Error",error);
                    })
        }
        init();


        function beginEdit(){
            vm.userdetailsedit=true;
            currentUser=$rootScope.currentUser;
            vm.displayName = currentUser.firstName;
            vm.firstNameNew = currentUser.firstName;
            vm.lastNameNew = currentUser.lastName;
            vm.usernameNew = currentUser.username;
            vm.passwordNew = currentUser.password;
            vm.emailsNew = currentUser.emails.join(",");
            vm.imageNew = currentUser.image;
        }

        function save(username,password,firstName,lastName,email,image) {
            if (username == "" || password == "" || firstName == "" || lastName == "" || email == "") {
                vm.userdetailsedit = true;
                alert("Enter all required details");
            }

            if(username == currentUser.username)
            {
                newDetails = {
                    "username": username, "firstName": firstName,
                    "lastName": lastName, "emails": email.split(","), "password": password
                };

                UserService.profileUpdate(currentUser._id, newDetails)
                    .then(
                        function(response){
                            $rootScope.currentUser=response.data;
                            init();
                            vm.userdetailsedit = false;
                        },
                        function(err){
                            vm.message="Couldn't update the profile";
                        });
            }

            else{
                alert("Not allowed to update username");
            }
        }

        function cancelEdit(){
            vm.userdetailsedit=false;
        }

        function followUser(){
            UserService.toFollowUser(currentUser._id,$routeParams.userId,userName,loggedInUserName)
                .then(function(response){
                        vm.message="Now you following the user";
                    },
                    function(err){
                        console.log("Sorry error while liking the user",err);
                    });
        }

        function unFollowUser(userId){
            UserService.unFollowUser(currentUser._id,userId)
                .then(function(resposne){
                        init();
                    },
                    function(err){
                        console.log("Sorry error while unfollowing the user",err);
                    });
        }
    }
})();
