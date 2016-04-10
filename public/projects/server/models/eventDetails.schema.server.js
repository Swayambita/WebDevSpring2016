var mongoose= require ("mongoose");

module.exports =function(){

        var EventSchema =mongoose.Schema(
            {eName:String,
                    desc:String,
                    sDate:{type :Date, default : Date.now},
                    sTime:{type :Date, default : Date.now},
                    eDate:{type :Date, default : Date.now},
                    eTime:{type :Date, default : Date.now},
                    image:String,
                    genre:String,
                    createdBy:String,
                    location:String,
                    live:Boolean},
            {collection :'EventDetails'});
        return EventSchema;
};