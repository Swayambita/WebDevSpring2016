
module.exports = function(app,userModel) {
       app.get("/api/assignment/user/:username/:password", findUserByCredentails);
       app.post("/api/assignment/register", register);
       app.put("/api/assignment/updateUser/:id",updateUser);
       app.delete("/api/assignment/deleteUser/:id",deleteUser);
       app.get("/api/assignment/getAllUsers/",getAllUsers);
       app.get("/api/assignment/getUserByUserName/:username",getUserByUserName);
       app.get("/api/assignment/getUserById/:id",getUserById);


    function findUserByCredentails(req,res){
        var username=req.params.username;
        var password=req.params.password;

        userModel.findUserByCredentials(username,password)
            .then(function(user){
             res.json(user);
            },
              function(err){
                res.status(400).send(err);
            });
    }

    function register(req,res){
        // username validation will be added when we implement passport
        var userDetails = req.body;
        userModel.createNewUser(userDetails)
            .then(function(user) {
                res.json(user);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function updateUser(req,res){
        console.log("upadteuser");
        var id=req.params.id;
        var updatedUserDetails = req.body;

        userModel.updateUser(id,updatedUserDetails)
            .then(function(user){
                console.log("1st response",user);

                userModel.getUserById(id)
                   .then(function (response){
                           console.log("2nd response",response);
                    res.json(response);
                },
                function(err){
                    res.status(400).send(err);
                });


            },
            function(err){
                console.log("error");
                res.status(400).send(err);
            });
    }

    function deleteUser(req,res){
        var id=req.params.id;
        userModel.deleteUser(id);
    }

    function getAllUsers(req,res){
        userModel.getAllUsers(id);
    }

    function getUserByUserName(req,res){
        var username=req.params.username;
        var user = userModel.getUserByUserName(username);
        res.json(user);
    }

    function getUserById(req,res){
        console.log("getuserbyid");
        var id=rq.params.id;
        var user=userModel.getUserById(id);
        return user;
    }
}