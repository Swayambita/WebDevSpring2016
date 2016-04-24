var mongoose=require("mongoose");

var Field=require("./field.schema.server.js");

module.exports =function(){
    var formSchema = mongoose.Schema(
        {userId:String,
            title:{type: String,default:"New Form"},
            fields:[{label:String,
                type: {
                    type: String,
                    enum : ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
                },
                placeholder:String,
                options:[{label:String,
                    value:String}]}],
            created:{type: Date,default:new Date()},
            updated:{type: Date,default:new Date()}},
        {collection :'form'});
    return formSchema;
};
