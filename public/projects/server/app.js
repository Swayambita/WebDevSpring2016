
module.exports=function(app,db){
    var userModel=require("./models/user.model.js")(db);
    var userEventModel=require("./models/userEvent.model.js")(db);
    var userEventConnectModel=require("./models/userEventConnect/userEventConnect.model.js")(db);
    var userToUserConnectModel=require("./models/userToUserConnect/userToUserConnect.model.js")(db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var eventService = require("./services/userEvent.service.server.js")(app,userEventModel);
    var userEventConnectService = require("./services/userEventConnect.service.server.js")(app,userEventConnectModel);
    var userToUserConnectService= require("./services/userToUserConnect.service.server.js")(app,userToUserConnectModel);
}