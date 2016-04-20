var mongoose=require("mongoose");
var q= require("q");

module.exports= function(uuid,db){

    var UserSchema=require("./userDetails.schema.server.js")();
    var UserDetails=mongoose.model("UserDetails",UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername:findUserByUsername,
        register :register,
        updateUser:updateUser,
        deleteUser:deleteUser,
        getUserByUserName:getUserByUserName,
        getAllUsers:getAllUsers,
        profileUpdate:profileUpdate,
        getUserById:getUserById,
        createNewUser:createNewUser,
        findAllUsers:findAllUsers
    }
    return api;

    function findUserByCredentials(username,password) {
        return UserDetails.findOne({"username":username,"password":password})
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserDetails.find(function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(userName){
        var deferred= q.defer();
        UserDetails.findOne (
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

    function register(userDetails){
        var deferred= q.defer();
        var userName=userDetails.username;
        var email=userDetails.email;

        UserDetails.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                UserDetails.update({"username":userName},{$push:{"emails":email}},
                    function(err,res){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            UserDetails.findOne({"username":userName},function(err,resp){
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
        UserDetails.update (
            {"_id": id},
            {$set: {"username":userDetails.username,
                "password":userDetails.password,
                "firstName":userDetails.firstName,
                "lastName":userDetails.lastName,
                "emails":userDetails.emails,
                "phones":userDetails.phones,
                "roles":userDetails.roles}},
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

    function deleteUser(id) {
        var deferred= q.defer();
        UserDetails.remove({"_id":id},function(err,doc){
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
        UserDetails.find({"username":username},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getUserByUserName(username){
        var deferred= q.defer();
        UserDetails.findOne({"username":username},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function getUserById(id){
        var deferred= q.defer();
        UserDetails.findOne({"_id":id},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function profileUpdate (id, userDetails) {
        var deferred= q.defer();
        UserDetails.update (
            {"_id": id},
            {$set: {"username":userDetails.username,"password":userDetails.password,
                "firstName":userDetails.firstName,
                "lastName":userDetails.lastName,
                "emails":userDetails.emails}},
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

    function createNewUser(userDetails){
        var deferred= q.defer();
        var userName=userDetails.username;
        var email=userDetails.email;
        UserDetails.create(userDetails,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                UserDetails.update({"username":userName},{$push:{"emails":email}},
                    function(err,res){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            UserDetails.findOne({"username":userName},function(err,resp){
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
}


