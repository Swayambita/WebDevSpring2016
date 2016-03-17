
module.exports=function(app){
    var userModel=require("./models/user.model.js")(app);
    var service = require("./services/user.service.server.js")(app,userModel);
}