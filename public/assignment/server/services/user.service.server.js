var passport=require('passport');
var LocalStrategy =require('passport-local').Strategy;
var bcrypt=require('bcrypt-nodejs');

module.exports = function(app,userModel) {

    var auth=authorized;
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout',logout);
    app.get('/api/assignment/loggedin',loggedin);
    app.post("/api/assignment/addNewUser",auth,addNewUser);
    app.post('/api/assignment/register',register);
    app.put("/api/assignment/updateUser/:id",auth,updateUser);
    app.delete("/api/assignment/deleteUser/:id",auth,deleteUser);
    app.get("/api/assignment/getAllUsers",auth,getAllUsers);
    app.get("/api/assignment/getUserByUserName/:username",getUserByUserName);
    app.get("/api/assignment/getUserById/:id",getUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        userModel
            .findUserByUsername( username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password,user.password))
                    {
                        return done(null, user);
                    }
                    else{
                        console.log("!!!!!");
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
                        return userModel.createNewUser(newUser);
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

    function updateUser(req,res) {
        var id = req.params.id;
        console.log("the id",id);
        var updatedUserDetails = req.body;
        if (!isAdmin(req.user)) {
            delete updatedUserDetails.roles;
            updatedUserDetails.roles = ["student"];
        }
        if (typeof updatedUserDetails.roles == "string") {
            updatedUserDetails.roles = updatedUserDetails.roles.split(",");
        }

        userModel
            .findUserByUsername(updatedUserDetails.username)
            .then(function (user) {
                if (user) {
                    if (bcrypt.compareSync(updatedUserDetails.password,user.password) == false) {
                        updatedUserDetails.password = bcrypt.hashSync(updatedUserDetails.password);
                    }
                    userModel.updateUser(id, updatedUserDetails)
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

    function deleteUser(req,res){
        if(isAdmin(req.user)){
            var userId =req.params.id;
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

    function getUserById(req,res){
        var id=rq.params.id;
        var user=userModel.getUserById(id);
        return user;
    }

    function addNewUser(req,res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles;
        } else {
            newUser.roles = ['student'];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createNewUser(newUser);
                    }
                },
                function(err){
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
}