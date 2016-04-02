var mongoose=require("mongoose");
var q= require("q");
//var mock = require("./user.mock.json");

module.exports= function(uuid,db){

    var UserSchema=require("./user.schema.server.js")();
    var User=mongoose.model("User",UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        createNewUser :createNewUser,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getUserByUserName:getUserByUserName,
        getUserById:getUserById
    }
        return api;

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


    function updateUser (id, userDetails) {
        var deferred= q.defer();
                User.update (
                            {"_id": id},
                            {$set: userDetails},
                    function (err, stats) {
                           if(!err){
                               console.log("&&&&");
                               deferred.resolve(stats);
                           }
                        else{
                               deferred.reject(err);
                           }
                    } );
        return deferred.promise;
    }

   /* function createNewUser(userDetails){
        var oldUser= findUserByUsername(userDetails.username);
        if(oldUser== null){
            userDetails._id =  uuid.v1();
            mock.push(userDetails);
                    return userDetails;
        }
        return null;
    }*/

    // add validation checks whether username already exists

    function createNewUser(userDetails){
        var deferred= q.defer();
        User.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

   /* function updateUser(id,updatedUserDetails) {

        //we need to check if userName is unique here
        for (var u in mock) {
            if (mock[u]._id == id) {
                mock[u] = updatedUserDetails;
                mock[u].email = updatedUserDetails.email;
                return mock[u];
            }
        }
    }*/

        function deleteUser(id) {
            for (var u in mock) {
                if (mock[u]._id == id) {
                    mock.splice(u, 1);
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

}


