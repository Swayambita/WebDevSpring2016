(function(){

    angular
        .module("EventBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http){

        var model = {

            setCurrentUser : setCurrentUser,
            updateUser : updateUser,
            deleteUser : deleteUser,
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            register: register,
            getAllUsers:getAllUsers,
            getUserById:getUserById,
            addNewUserByAdmin:addNewUserByAdmin,
            profileUpdate:profileUpdate,
            getFavEvents:getFavEvents,
            login:login,
            logout:logout,
            toFollowUser:toFollowUser,
            getMyFollowers:getMyFollowers,
            getWhomAmFollowing:getWhomAmFollowing,
            unFollowUser:unFollowUser
        };
        return model;

        function setCurrentUser(user){
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

        function deleteUser(user){
            return $http.delete("/api/project/deleteUser/"+user);
        }


        function updateUser(user,currentUserId){
            return $http.put("/api/project/updateUser/"+currentUserId,user);
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

        function getFavEvents(userId){
            return $http.get("/api/project/getFavEvents/"+userId);
        }

        function login(user) {
            return $http.post("/api/project/login",user);}

        function logout() {
            return $http.post("/api/project/logout");
        }

        function toFollowUser(loggedInUser,userTofollow,userName,loggedInUserName){
            return $http.post("/api/project/userTofollow/"+loggedInUser+"/"+userTofollow+"/"+userName+"/"+loggedInUserName);
        }

        function getMyFollowers(userId){
            return $http.get("/api/project/getFollowers/"+userId);
        }

        function getWhomAmFollowing(userId){
            return $http.get("/api/project/getWhomAmFollowing/"+userId);
        }

        function unFollowUser(followerId,userId){
            return $http.put("/api/project/unFollowUser/"+followerId+"/"+userId);
        }

        function addNewUserByAdmin(user){
            return $http.post("/api/project/addNewUser",user);
        }
    }
})();


