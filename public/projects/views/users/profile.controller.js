(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,UserService,$rootScope){

        $scope.update=update;
        $scope.message=null;

        var currentUser=$rootScope.currentUser;

        $scope.userName=currentUser.username;
        $scope.password = currentUser.password;
        $scope.firstName = currentUser.firstName;
        $scope.lastName = currentUser.lastName;
        $scope.email = currentUser.email;



        function update(userName,password,firstName,lastName,email){
            var id=currentUser._id;
            var roles=currentUser.roles;

            var user={
                "_id":id,
                "username":userName,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "roles":roles,
                "email":email
            }


            UserService.updateUser(id,user,render);

            function render(user){

             if(user){
                 UserService.setCurrentUser(user);
                 $scope.message("Profile updated!");
             }


            }
        }

    }
})();
