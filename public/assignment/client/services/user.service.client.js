(function(){

    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var model = {

            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
          //  deleteUserById : deleteUserById,
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            register: register,
            getAllUsers:getAllUsers,
            getUserById:getUserById,
            deleteUser:deleteUser
        };
        return model;

        function setCurrentUser(user){
            console.log("setting the current user",user);
            $rootScope.currentUser=user;
        }


       /* function deleteUserById(userId, callback){
            for(var u in model.users) {
                if (model.users[u]._id == userId) {
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }*/

        function findAllUsers(callback) {
            callback(users);
        }


        function findUserByCredentials(credentials){
            return $http.get("/api/assignment/user/"+credentials.username+"/"+credentials.password);
        }

        function register(user){
            return $http.post("/api/assignment/register", user);
        }

        function updateUser(user){
            return $http.put("/api/assignment/updateUser/"+user._id,user);
        }

        function deleteUser(user){
            return $http.delete("/api/assignment/deleteUser/"+user._id);
        }

        function getAllUsers(){
            return $http.get("/api/assignment/getAllUsers/");
        }

        function getUserByUserName(username){
            return $http.get("/api/assignment/getUserByUserName/"+username);
        }

        function getUserById(id){
            return $http.get("/api/assignment/getUserById/"+id);
        }


    }
})();


