
module.exports=function(app,uuid,db) {
    var userModel = require("./models/user.model.js")(uuid,db);
    var formModel = require("./models/form.model.js")(uuid,db);
    var fieldModel = require("./models/field.model.js")(uuid,formModel,db);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var modelservice = require("./services/form.service.server.js")(app, formModel);
    var fieldservice = require("./services/field.service.server.js")(app, fieldModel,formModel);
}