
module.exports=function(app,uuid,db){
    var userModel=require("./models/user.model.js")(uuid,db);
    var userEventModel=require("./models/userEvent.model.js")(uuid,db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var eventService = require("./services/userEvent.service.server.js")(app,userEventModel);

}