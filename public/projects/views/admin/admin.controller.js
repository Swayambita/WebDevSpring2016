
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController($scope,$location,UserService,$rootScope){

        $scope.addUser= addUser;
        $scope.updateUser=updateUser;
        $scope.deleteUser=deleteUser;
        $scope.selectUser=selectUser;

        var currentUsers = [];
        var indexSelected;

        UserService.getAllUser(renderAllUsers);

        function renderAllUsers(allUsers){
            currentUsers = allUsers;
            $scope.allUsers=allUsers;
        }

        function addUser(newUser){
            UserService.addNewUser(newUser);
            UserService.getAllUser(renderAllUsers);
            $scope.user=null;
        }

        function updateUser(user){
            currentUsers[indexSelected]=user;
            $scope.user=null;
        }

        function deleteUser(index){
            indexSelected=index;
            var userId= currentUsers[index]._id;
            UserService.deleteUserById(userId,renderAllUsers);
        }

        function selectUser(index){
            indexSelected=index;
            $scope.user=
                {   "_id":currentUsers[indexSelected]._id,
                    "firstName":currentUsers[indexSelected].firstName,
                    "lastName":currentUsers[indexSelected].lastName,
                    "username":currentUsers[indexSelected].username,
                    "password":currentUsers[indexSelected].password,
                    "roles": currentUsers[indexSelected].roles
                };
        }
    }
})();

