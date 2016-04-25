var passport=require('passport');
var LocalStrategy =require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,userModel) {

    var auth=authorized;
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout',logout);
    app.get('/api/project/loggedin',loggedin);
    app.get("/api/project/user/:username/:password", findUserByCredentials);
    app.post("/api/project/register", register);
    app.put("/api/project/updateUser/:id",auth,updateUser);
    app.put("/api/project/profileUpdate/:userId",profileUpdate);
    app.delete("/api/project/deleteUser/:userId",auth,deleteUser);
    app.get("/api/project/getAllUsers/",auth,getAllUsers);
    app.get("/api/project/getUserByUserName/:username",getUserByUserName);
    app.post("/api/project/addNewUser",auth,addNewUser);
    app.get("/api/project/getUserById/:userId",getUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password,user.password))
                    {
                        return done(null, user);
                    }
                    else{
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .getUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.register(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
        if(isAdmin(req.user)){
            var userId =req.params.userId;
            userModel.deleteUser(userId)
                .then(function(stats){
                        res.send(200);
                    },
                    function(err){
                        res.status(400).send(err);
                    })
                .then(function(users){
                    res.json(users);
                }, function (err) {
                    res.status.send(err);
                });
        }
    }

    function getAllUsers(req,res){
        if(isAdmin(req.user)){
            userModel.findAllUsers()
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
        }else{
            res.status(403);
        }
    }

    function getUserByUserName(req,res){
        var username=req.params.username;
        var user = userModel.getUserByUserName(username);
        res.json(user);
    }

    function addNewUser(req,res){
        var newUser=req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles;
        } else {
            newUser.roles = ['student'];
        }
        userModel
            .findUserByUsername( newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createNewUser(newUser)

                    }
                },
                function(err){
                    console.log("error 2");
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    }else{
                        res.json(null);
                    }},
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findUserByCredentials(req,res){
        var username=req.params.username;
        var password=req.params.password;

        userModel.findUserByCredentials(username,password)
            .then(function(user){
                    /// added this line
                    req.session.currentUser = doc;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function profileUpdate(req,res) {
        var id = req.params.userId;
        var updatedUserDetails = req.body;
        updatedUserDetails.roles = ["student"];

        userModel
            .findUserByUsername(updatedUserDetails.username)
            .then(function (user) {
                if (user) {
                    if(updatedUserDetails.password.length != user.password.length) {
                        updatedUserDetails.password = bcrypt.hashSync(updatedUserDetails.password);
                    }
                    userModel.profileUpdate(id, updatedUserDetails)
                        .then(function (user) {
                                userModel.getUserById(id)
                                    .then(function (response) {
                                            res.json(response);
                                        },
                                        function (err) {
                                            res.status(400).send(err);
                                        });
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                }
                else{
                    res.status(400).send(err);
                }
            }),
            function(err){
                res.status(400).send(err);
            };
    }

    function getUserById(req,res){
        var id=req.params.userId;
        userModel.getUserById(id)
            .then(function(user) {
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function updateUser(req,res){
        var id=req.params.id;
        var updatedUserDetails = req.body;

        if(!isAdmin(req.user)) {
            delete updatedUserDetails.roles;
            updatedUserDetails.roles=["student"];
        }
        if(typeof updatedUserDetails.roles == "string") {
            updatedUserDetails.roles = updatedUserDetails.roles.split(",");
        }

        userModel
            .findUserByUsername(updatedUserDetails.username)
            .then(function(user){
                    if(user){
                        updatedUserDetails.password = bcrypt.hashSync(updatedUserDetails.password);
                        userModel.updateUser(id,updatedUserDetails)
                            .then(function(user){
                                    userModel.getUserById(id)
                                        .then(function (response){
                                                res.json(response);
                                            },
                                            function(err){
                                                res.status(400).send(err);
                                            });
                                },
                                function(err){
                                    res.status(400).send(err);
                                });
                    }
                    else{
                        res.status(400).send(err);
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}