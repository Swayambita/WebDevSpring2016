
module.exports = function(app,userModel) {
       app.post("/api/assignment/formMaker/login", login);
       app.post("/api/assignment/formMaker/register", register);
       app.post("/api/assignment/formMaker/updateUser/:id",updateUser);


    function login(req,res){

        var credentials=req.body;
        var user=userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function register(req,res){
        var userDetails = req.body;
        var newUser=userModel.createNewUser(userDetails);
        res.json(newUser);

    }

    function updateUser(req,res){
        var updatedUserDetails = req.body;
        console.log("in server services");
        var updatedUser=userModel.updateUser(updatedUserDetails);
        res.json(updatedUser);
    }
}