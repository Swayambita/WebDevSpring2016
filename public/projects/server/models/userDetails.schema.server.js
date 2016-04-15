var mongoose= require ("mongoose");

module.exports =function(){

    var UserSchemaProject =mongoose.Schema(
        {username:String,
            password:String,
            firstName:String,
            lastName:String,
            emails:[String],
            roles:[String],
            phones:[String]},
        {collection :'RegisteredUser'});
    return UserSchemaProject;
};