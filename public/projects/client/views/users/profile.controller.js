(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService,UserEventService,$rootScope,$routeParams){

        var currentUser= $rootScope.currentUser;
        var vm=this;
        vm.beginEdit=beginEdit;
        vm.save=save;
        vm.cancelEdit=cancelEdit;
        vm.message= null;
        vm.loggedInUser=currentUser._id;
        var profileUser=$routeParams.userId;
        vm.viewProfileOfUser=$routeParams.userId;
        vm.userdetailsedit =false;
        vm.followUser=followUser;
        var loggedInUserName=currentUser.username;
        var userName=null;
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
                             // console.log("my followers are",response);


                        },
                        function(error){
                            //vm.message="Couldn't find your followers";
                        });

                    UserService.getWhomAmFollowing(vm.viewProfileOfUser)
                        .then(function(response){
                                vm.iFollow=response.data;
                               // console.log("I am following",response);
                            },
                            function(error){
                             // console.log("i am following error",error);
                            });

                        UserEventService.findEventsFoCurrentUser(vm.viewProfileOfUser)
                            .then(function(response){
                                console.log("****",response);
                                vm.userEvents=response.data;
                            },
                            function(err){
                                console.log("error while fetching events created by user");
                            })

                    },
                    function(error){
                       // vm.message="Couldn't find the profile";
                    })
        }
        init();


        function beginEdit(){
            vm.userdetailsedit=true;
            var currentUser=$rootScope.currentUser;
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
               // vm.message = "Enter all required details";
                vm.userdetailsedit = true;
                alert("Enter all required details");
            }

            else {
                var newDetails = {
                    "username": username, "firstName": firstName,
                    "lastName": lastName, "emails": email.split(","), "password": password
                };

                UserService.profileUpdate(currentUser._id, newDetails)
                    .then(
                        function(response){
                            $rootScope.currentUser=response.data;
                            //alert("Profile Updated");
                            vm.message="Profile Update";
                            init();
                            vm.userdetailsedit = false;
                        },
                        function(err){
                            vm.message="Couldn't update the profile";
                        });
            }
        }

        function cancelEdit(){
            vm.userdetailsedit=false;
        }

        function followUser(){
            UserService.toFollowUser(currentUser._id,$routeParams.userId,userName,loggedInUserName)
                .then(function(response){
                   // alert("Now you are following the user");
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
