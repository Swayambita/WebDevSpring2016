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
        vm.userSort = userSort;
        vm.sortOnUsername=sortOnUsername;
        vm.sortOnFirstName=sortOnFirstName;
        vm.sortOnLastName=sortOnLastName;
        vm.message=null;

        var indexSelected;
        var currentUsers=[];
        var currentUser;
        currentUser=$rootScope.currentUser;

        function init(){
            UserService.getAllUsers()
                .then(function(response){
                    currentUsers=response.data;
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

        function updateUser(username,password,firstName,lastName,roles) {
            console.log("the update details", username, password, firstName, lastName, roles);
            console.log("index selected", indexSelected);
            var userSelected = currentUsers[indexSelected];
            console.log("user selected", userSelected);
            var user = {
                "username": username,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "roles": roles,
                "emails": userSelected.emails,
                "phones": userSelected.phones
            };
            console.log("user we are sending", user);
            console.log("the id of user we will update", userSelected._id);
            UserService.updateUser(user, userSelected._id)
                .then(function (res) {
                    if (res.data != null) {
                        init();
                    }
                    else {
                        vm.message = "Username already exists";
                    }
                });
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
            vm.roles=currentUsers[index].roles;
        }


        function userSort(func) {
            vm.allUsers.sort(func);
            vm.ascending = !vm.ascending;
        }

        function sortOnUsername(user1, user2) {
            var val = 0;
            if (user1.username < user2.username) {
                val = -1;
            }
            else if (user1.username === user2.username) {
                val = 0;
            }
            else {
                val = 1;
            }

            if(vm.ascending) {
                val = val * -1;
            }

            return val;
        }

        function sortOnFirstName(user1, user2) {
            var val = 0;
            if (user1.firstName < user2.firstName) {
                val = -1;
            }
            else if (user1.firstName === user2.firstName) {
                val = 0;
            }
            else {
                val = 1;
            }

            if(vm.ascending) {
                val = val * -1;
            }

            return val;
        }

        function sortOnLastName(user1, user2) {
            var val = 0;
            if (user1.lastName < user2.lastName) {
                val = -1;
            }
            else if (user1.lastName === user2.lastName) {
                val = 0;
            }
            else {
                val = 1;
            }

            if(vm.ascending) {
                val = val * -1;
            }

            return val;
        }
    }
})();

