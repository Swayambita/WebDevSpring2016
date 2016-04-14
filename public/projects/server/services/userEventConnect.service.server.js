module.exports = function(app,userEventModel) {
    app.post("/api/project/createEvent/:currentUserId",createEvent);


    function createEvent(req,res){
        var userId=req.params.currentUserId;
        var newEvent=req.body;

        userEventModel.createNewEvent(userId,newEvent)
            .then(function(resp){
                    res.json(resp);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

}
