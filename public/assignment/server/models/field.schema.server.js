var mongoose=require("mongoose");

module.exports =function(){
    var fieldSchema  =mongoose.Schema(
           {label:String,
            type:String,
            placeholder:String,
            options:[{label:String,
                value:String}]},
        {collection :'field'});
    return fieldSchema;


};
