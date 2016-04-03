//var mock = require("./user.mock.json");
var mongoose=require("mongoose");
var q= require("q");

module.exports= function(uuid,db){

    var UserSchema=require("./user.schema.server.js")();
    var User=mongoose.model("User",UserSchema);

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
     //   ifExitsEmail:ifExitsEmail,
        getFavEvents:getFavEvents
    }
    return api;

  /*  function findUserByCredentials(username,password) {
        console.log("in server model");
        for(var u in mock) {
            if( mock[u].username == username &&
                mock[u].password == password) {
                return mock[u];
            }
        }
        return null;
    }*/


    function findUserByCredentials(username,password) {
        return User.findOne({"username":username,"password":password})
    }

    function findUserByUsername(userName){
        var deferred= q.defer();
        User.findOne (
            {"username": userName},
            function (err, stats) {
                if(!err){
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            } );
        return deferred.promise;
    }


   /* function findUserByUsername(userName){
        for(var u in mock){
            if(mock[u].username=== userName){
                return mock[u];
            }
        }
        return null;
    }*/

    function ifExitsEmail(email){
        for(var u in mock){
            if(mock[u].email== email){
                console.log("inside if");
                return mock[u];
            }
        }
        return null;
    }

   /* function register(userDetails){
        var oldUser= findUserByUsername(userDetails.username);
        var emailExits=ifExitsEmail(userDetails.email);
        if(oldUser== null && emailExits==null){
            userDetails._id =  uuid.v1();
            mock.push(userDetails);
            return userDetails;
        }
        return null;
    }*/


    //check if repeated username and repeated emailid
    function register(userDetails){
        var deferred= q.defer();
        var userName=userDetails.username;
        var email=userDetails.email;

        User.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                User.update({"username":userName},{$push:{"emails":email}},
                    function(err,res){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            User.findOne({"username":userName},function(err,resp){
                                if(err){
                                    deferred.reject(err);
                                }
                                else{
                                    deferred.resolve(resp);
                                }
                            })
                        }
                    });
            }
        });

        return deferred.promise;
    }

    function updateUser (id, userDetails) {
        var deferred= q.defer();
        User.update (
            {"_id": id},
            {$set: {"username":userDetails.username,"password":userDetails.password,
                "firstName":userDetails.firstName,
                "lastName":userDetails.lastName,
                "emails":userDetails.email}},
            function (err, stats) {
                if(!err){
                    deferred.resolve(stats);
                }
                else{
                    deferred.reject(err);
                }
            } );
        return deferred.promise;
    }

    /*function updateUser(id,updatedUserDetails) {
        //we need to check if userName is unique here
        for (var u in mock) {
            if (mock[u]._id == id) {
                mock[u] = updatedUserDetails;
                mock[u].email = updatedUserDetails.email;
                return mock;
            }
        }
    }*/

   /* function deleteUserById(id) {
        for (var u in mock) {
            if (mock[u]._id == id) {
                console.log("inside if",id);
                mock.splice(u, 1);
                console.log("after deletion",mock);
               return mock;
            }
        }
    }*/

    function deleteUserById(id) {
        var deferred= q.defer();
        User.remove({"_id":id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getAllUsers(){
        var deferred= q.defer();
        User.find({},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

   /* function getUserByUserName(username){
        for (var u in mock) {
            if (mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }*/

    function getUserByUserName(username){
        var deferred= q.defer();
        User.findOne({"username":username},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    /*function getUserById(id){
        for (var u in mock) {
            if (mock[u]._id == id) {
                return mock[u];
            }
        }
        return null;
    }*/


    function getUserById(id){
        var deferred= q.defer();
        User.findOne({"_id":id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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


