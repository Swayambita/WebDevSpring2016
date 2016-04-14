var mongoose= require ("mongoose");

module.exports =function(){

    var UserEventConnect =mongoose.Schema(
        {userId:String,
        eventId:String,
        likes:Boolean,
        comment:String,
        bookMark:Boolean},
        {collection :'UserEventConnect'});
    return UserEventConnect;
};