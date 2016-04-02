var mongoose=require("mongoose");

var Field=require("./field.schema.server.js");

module.exports =function(){
    var formSchema  =mongoose.Schema(
        {userId:String,
            title:String,
            fields:[{label:String,
                type: {
                    type: String,
                    enum : ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
                },
                placeholder:String,
                options:[{label:String,
                    value:String}]}],
            //fields:[Field],
            created:Date,
            updated:Date},
        {collection :'form'});
    return formSchema;
};
