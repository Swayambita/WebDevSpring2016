(function(){

    angular
        .module("EventBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

       /* var model = {
            findUserByCredentials : findUserByCredentials,
            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
            createUser:createUser,
            deleteUserById : deleteUserById,
            findAllUsers : findAllUsers,
            getAllUser :getAllUser,
            addNewUser:addNewUser

        };
        return model;*/


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
            console.log(user);
            $rootScope.currentUser=user;
        }


        function findUserByCredentials(credentials){
            console.log("in client service");
            return $http.get("/api/project/user/"+credentials.username+"/"+credentials.password);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function register(user){
            return $http.post("/api/project/register", user);
        }

        function updateUser(user){
            return $http.put("/api/project/updateUser/"+user._id,user);
        }

        function deleteUser(user){
            return $http.delete("/api/project/deleteUser/"+user._id);
        }

        function getAllUsers(){
            return $http.get("/api/project/getAllUsers/");
        }

        function getUserByUserName(username){
            return $http.get("/api/project/getUserByUserName/"+username);
        }

        function getUserById(id){
            return $http.get("/api/project/getUserById/"+id);
        }



      /*  function updateUser(id,user,callback){

            for(var u in model.users) {
                if (model.users[u]._id == id) {
                    model.users[u] = user;
                    callback(model.users[u]);
                }
                else{
                    callback(null);
                }
            }
        }

        function createUser(user,callback){

            var user ={
             username: user.username,
             password:user.password,
             _id:(new Date).getTime(),
             email:user.email
         };
            model.users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback){
            for(var u in model.users) {
                if (model.users[u]._id == userId) {
                    model.users.splice(u, 1);
                }
            }
            callback(model.users);
        }

        function findAllUsers(callback){
            callback(users);
        }


        function getAllUser(callback){
            var allUsers=model.users;
            callback(allUsers);
        }

        function addNewUser(newUser){

            var newUser={
                username : newUser.username,
                password : newUser.password
            };
            model.users.push(newUser);
            callback(newUser);
        }*/

    }
})();


