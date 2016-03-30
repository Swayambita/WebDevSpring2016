var mongoose=require("mongoose");

// how to create an instance of Field???
var Fields=require("/field.schema.server.js");

module.exports =function(){
    var formSchema  =mongoose.Schema(
        {userId:String,
            title:String,
            fields:[Field],
            created:[Date],
        updated:[Date]},{collection :'form'});
    return formSchema;


};
