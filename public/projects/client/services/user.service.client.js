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
            deleteUserById : deleteUserById,
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            register: register,
            getAllUsers:getAllUsers,
            getUserById:getUserById,
            addNewUser:addNewUser,
            profileUpdate:profileUpdate,
            getFavEvents:getFavEvents,
        };
        return model;

        function setCurrentUser(user){
            console.log("setting user",user);
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

        function updateUser(userId,user){
            return $http.put("/api/project/updateUser/"+userId,user);
        }

        function profileUpdate(userId,user){
            return $http.put("/api/project/profileUpdate/"+userId,user);
        }
        function deleteUserById(userId){
            return $http.delete("/api/project/deleteUser/"+userId);
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

        function addNewUser(newUser){
            return $http.post("/api/project/addNewUser",newUser);
        }

        function getFavEvents(userId){
            console.log("in getFavEvents clinet service");
            return $http.get("/api/project/getFavEvents/"+userId);
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


