
module.exports=function(app,db) {
    var userModel = require("./models/user.model.js")(db);
    var formModel = require("./models/form.model.js")(db);
    var fieldModel = require("./models/field.model.js")(formModel,db);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel,formModel);
}