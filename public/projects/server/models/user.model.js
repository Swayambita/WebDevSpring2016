var mock = require("./user.mock.json");

module.exports= function(uuid){

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        register :register,
        updateUser:updateUser,
        deleteUserById:deleteUserById,
        getUserByUserName:getUserByUserName,
        getUserById:getUserById,
        getAllUsers:getAllUsers,
        addNewUser:addNewUser,
        profileUpdate:profileUpdate,
        ifExitsEmail:ifExitsEmail,
        getFavEvents:getFavEvents
    }
    return api;

    function findUserByCredentials(username,password) {
        console.log("in server model");
        for(var u in mock) {
            if( mock[u].username == username &&
                mock[u].password == password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(userName){
        for(var u in mock){
            if(mock[u].username=== userName){
                return mock[u];
            }
        }
        return null;
    }

    function ifExitsEmail(email){
        for(var u in mock){
            if(mock[u].email== email){
                console.log("inside if");
                return mock[u];
            }
        }
        return null;
    }

    function register(userDetails){
        var oldUser= findUserByUsername(userDetails.username);
        var emailExits=ifExitsEmail(userDetails.email);
        if(oldUser== null && emailExits==null){
            userDetails._id =  uuid.v1();
            mock.push(userDetails);
            return userDetails;
        }
        return null;
    }

    function updateUser(id,updatedUserDetails) {
        //we need to check if userName is unique here
        for (var u in mock) {
            if (mock[u]._id == id) {
                mock[u] = updatedUserDetails;
                mock[u].email = updatedUserDetails.email;
                return mock;
            }
        }
    }

    function deleteUserById(id) {
        for (var u in mock) {
            if (mock[u]._id == id) {
                console.log("inside if",id);
                mock.splice(u, 1);
                console.log("after deletion",mock);
               return mock;
            }
        }
    }

    function getAllUsers(){
        return mock;
    }

    function getUserByUserName(username){
        for (var u in mock) {
            if (mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }

    function getUserById(id){
        for (var u in mock) {
            if (mock[u]._id == id) {
                return mock[u];
            }
        }
        return null;
    }

    function addNewUser(user){
        var oldUser= findUserByUsername(user.username);

      if(oldUser==null){
        user._id =  uuid.v1();
        mock.push(user);
        return mock;
      }
        else{
          return null;
      }
    }


    function profileUpdate(id,updatedUserDetails){
        //we need to check if userName is unique here, we need to check with the userid
       /* var oldUser= findUserByUsername(updatedUserDetails.username);

        if(oldUser==null){
            for (var u in mock) {
                if (mock[u]._id == id) {
                    mock[u] = updatedUserDetails;
                    mock[u].email = updatedUserDetails.email;
                    console.log("the mock[u] data",mock[u]);
                    return mock[u];
                }
            }
        }
       else{
            return null;
        }*/

        for (var u in mock) {
            if (mock[u]._id == id) {
                mock[u] = updatedUserDetails;
                mock[u].email = updatedUserDetails.email;
                console.log("the mock[u] data",mock[u]);
                return mock[u];
            }
        }
    }


    function getFavEvents(userId){
        console.log("in getFavEvents server model");
        for (var u in mock) {
            if (mock[u]._id == userId) {
                console.log("these are the likes", mock[u].likes);
                return mock[u].likes;
            }
        }
    }
}


