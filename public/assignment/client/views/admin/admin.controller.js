(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController($rootScope,UserService){
        var vm=this;
        vm.addUser= addUser;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.selectUser=selectUser;
        vm.message=null;

        var indexSelected;
        var currentUsers=[];
        var currentUser;
        currentUser=$rootScope.currentUser;

        function init(){
            UserService.getAllUsers()
                .then(function(response){
                    currentUsers=response.data;
                    console.log("initailly all users are", currentUsers);
                    vm.allUsers=response.data;
                    vm.username=null;
                    vm.password=null;
                    vm.firstName=null;
                    vm.lastName=null;
                    vm.roles=null;
                    vm.message=null;
                },function(err){
                    console.log(err);
                })
        }

        init();

        function addUser(username,password,firstName,lastName,roles){
            if(username!=null && firstName!=null && lastName!=null && roles!=null)
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
            var userSelected=currentUsers[indexSelected];
            var user={"username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "roles":roles,
                "emails":vm.userSelected.emails,
                "phones":vm.userSelected.phones
            };
            UserService.updateUser(user,userSelected._id)
                .then(init());
        }

        function deleteUser(index){
            indexSelected=index;
            var userId= currentUsers[indexSelected]._id;
            UserService.deleteUser(userId)
                .then(init());
                    //vm.allUsers=response.data;

        }

        function selectUser(index){
            indexSelected = index;
            vm.username= currentUsers[index].username;
            vm.password=currentUsers[index].password;
            vm.firstName=currentUsers[index].firstName;
            vm.lastName=currentUsers[index].lastName;
            vm.roles=currentUsers[index].roles;n
        }
    }
})();

