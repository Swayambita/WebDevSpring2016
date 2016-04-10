(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController($location,UserService){
        var vm=this;
        vm.addUser= addUser;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.selectUser=selectUser;
        vm.message=null;

        function init(){
            UserService.getAllUsers()
                .then(function(response){
                    vm.allUsers=response.data;
                    vm.username=null;
                    vm.password=null;
                    vm.firstName=null;
                    vm.lastName=null;
                    vm.roles=null;
                    vm.message=null;
                })
        }

        init();

        function addUser(username,password,firstName,lastName,roles){
            var user={"username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                 "roles":roles};
            UserService.addNewUserByAdmin(user)
                .then(function(response){
                    if(response.data!=null){
                        init();
                    }
                    else{
                        vm.message="Username already exists";
                    }
                });
        }

        function updateUser(username,password,firstName,lastName,roles){
            var index= vm.indexSelected;
            var userId= vm.allUsers[index]._id;
            var user={"username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "roles":roles,
                "emails":vm.allUsers[index].emails,
                "phones":vm.allUsers[index].phones
            };
            UserService.updateUser(user,userId)
                .then(init());
        }

        function deleteUser(index){
            vm.indexSelected=index;
            var userId= vm.allUsers[index]._id;
            UserService.deleteUser(userId)
                .then(init());
                    //vm.allUsers=response.data;

        }

        function selectUser(index){
            vm.indexSelected= index;
            vm.username= vm.allUsers[index].username;
            vm.password=vm.allUsers[index].password;
            vm.firstName=vm.allUsers[index].firstName;
            vm.lastName=vm.allUsers[index].lastName;
            vm.roles=vm.allUsers[index].roles;
        }
    }
})();

