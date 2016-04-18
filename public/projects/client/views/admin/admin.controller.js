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
            if(username ==null || password ==null){
               alert("Enter all the required fields");
            }
            else{
                var user={"username":username,
                    "password":password,
                    "firstName":firstName,
                    "lastName":lastName,
                    "roles":roles};
                UserService.addNewUserByAdmin(user)
                    .then(function(response){
                        if(response.data){
                            init();
                        }
                        else{
                            alert("Username already exists");
                            init();
                        }
                    });
            }
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
                .then(function(res){
                    if(res.data){
                        init();
                    }
                    else{
                        alert("Username already exist");
                        init();
                    }
                },function(err){

                });
        }

        function deleteUser(index){
            vm.indexSelected=index;
            var userId= vm.allUsers[index]._id;
            UserService.deleteUser(userId)
                .then(init());
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

