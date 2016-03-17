var mock = require("./user.mock.json");

module.exports= function(){

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createNewUser :createNewUser,
        updateUser:updateUser,
        test:test
    }
        return api;

    function findUserByCredentials(credentials) {
        for(var u in mock) {
                      if( mock[u].username === credentials.username &&
                                mock[u].password === credentials.password) {
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
            return null;
        }
    }

    function createNewUser(userDetails){
        var oldUser= findUserByUsername(userDetails.username);
        if(oldUser== null){
            userDetails._id =  (new Date()).getTime();
            mock.push(userDetails);
                    return userDetails;
        }
        return null;
    }

    function updateUser(updatedUserDetails){

        //we need to check if userName is unique here
        for(var u in mock){
            if(mock[u]._id === updatedUserDetails._id){
                mock[u].firstName= updatedUserDetails.firstName;
                mock[u].lastName= updatedUserDetails.lastName;
                mock[u].username= updatedUserDetails.username;
                mock[u].password= updatedUserDetails.password;
                mock[u].email= updatedUserDetails.email;
                return mock[u];
            }
        }
    }

    function test(){
        console.log("in test");
    }
}


