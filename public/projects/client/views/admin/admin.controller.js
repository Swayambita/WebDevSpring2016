(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("AdminController",AdminController);

   /* function AdminController($scope,$location,UserService,$rootScope){

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
    }*/


    function AdminController($location,UserService){
        var vm=this;
        vm.addUser= addUser;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.selectUser=selectUser;
        vm.alertMessage=null;

        function init(){
            UserService.getAllUsers()
                .then(function(response){
                    vm.allUsers=response.data;
                    vm.username=null;
                    vm.password=null;
                })
        }

        init();

        function addUser(username,password){
            var user={"username":username,
            "password":password};
            UserService.addNewUser(user)
                .then(function(response){
                    if(response.data!=null){
                    vm.allUsers=response.data;
                    vm.username=null;
                    vm.password=null;
                    }
                    else{
                        console.log("in else",vm.allUsers)
;                        vm.alertMessage="username already exists";
                    }
                })
        }

        function updateUser(username,password){
           var index= vm.indexSelected;
            console.log("the index",index);
            var userId= vm.allUsers[index]._id;
            var user={"username":username, 
                "password":password}; 
            UserService.updateUser(userId,user) 
                .then(function(response){ 
                    vm.allUsers=response.data; 
                    vm.username=null; 
                    vm.password=null; 
                }) 
        }

        function deleteUser(index){
            vm.indexSelected=index;
            var userId= vm.allUsers[index]._id;
            console.log("***",userId);
            UserService.deleteUserById(userId)
                .then(function(response){
                    console.log("***",response.data);
                    vm.allUsers=response.data;
                });

        }

        function selectUser(index){
            vm.indexSelected= index;
            vm.username= vm.allUsers[index].username;
            vm.password=vm.allUsers[index].password;

        }


    }
})();

