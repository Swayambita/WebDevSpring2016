(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("AdminController",AdminController);

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
                    vm.firstName=null;
                    vm.lastName=null;
                })
        }

        init();

        function addUser(username,password,firstName,lastName){
            var user={"username":username,
            "password":password,
            "firstName":firsName,
            "lastName":lastName};
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

        function updateUser(username,password,firstName,lastName){
           var index= vm.indexSelected;
            console.log("the index",index);
            var userId= vm.allUsers[index]._id;
            var user={"username":username, 
                "password":password,
            "firstName":firstName,
            "lastName":lastName}; 
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

