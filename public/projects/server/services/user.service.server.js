
module.exports = function(app,userModel) {
    app.get("/api/project/user/:username/:password", findUserByCredentials);
    app.post("/api/project/register", register);
    app.put("/api/project/updateUser/:userId",updateUser);
    app.put("/api/project/profileUpdate/:userId",profileUpdate);
    app.delete("/api/project/deleteUser/:userId",deleteUserById);
    app.get("/api/project/getAllUsers/",getAllUsers);
    app.get("/api/project/getUserByUserName/:username",getUserByUserName);
    app.get("/api/project/getUserById/:id",getUserById);
    app.post("/api/project/addNewUser",addNewUser);
    app.get("/api/project/getFavEvents/:userId",getFavEvents);


    function findUserByCredentials(req,res){
        var username=req.params.username;
        var password=req.params.password;
        var user=userModel.findUserByCredentials(username,password);
        res.json(user);
    }

    function register(req,res){
        var userDetails = req.body;
        var newUser=userModel.register(userDetails);
        res.json(newUser);

    }

    function updateUser(req,res){
        var userId=req.params.userId;
        var updatedUserDetails = req.body;
        var updatedUser=userModel.updateUser(userId,updatedUserDetails);
        res.json(updatedUser);
    }

    function deleteUserById(req,res){
        var userId=req.params.userId;
        var allUsers=userModel.deleteUserById(userId);
        res.json(allUsers);
    }

    function getAllUsers(req,res){
        var allUsers=userModel.getAllUsers();
        res.json(allUsers);
    }

    function getUserByUserName(req,res){
        var username=req.params.username;
        var user = userModel.getUserByUserName(username);
        res.json(user);
    }

    function getUserById(req,res){
        var id=rq.params.id;
        var user=userModel.getUserById(id);
        res.json(user);
    }

    function addNewUser(req,res){
        var newuser=req.body;
        var allUser=userModel.addNewUser(newuser);
        res.json(allUser);
    }

    function profileUpdate(req,res){
        var userId=req.params.userId;
        var updatedUserDetails = req.body;
        var updatedUser=userModel.profileUpdate(userId,updatedUserDetails);
        res.json(updatedUser);
    }

    function getFavEvents(req,res){
        console.log("in getFavEvents server service");
        var userId=req.params.userId;
        res.json(userModel.getFavEvents(userId)) ;

    }
}