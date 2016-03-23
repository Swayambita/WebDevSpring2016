module.exports = function(app,userEventModel) {
    app.post("/api/project/createEvent/:currentUserId",createEvent);
    app.get("/api/project/getAllEvent/user/:userId",findEventsFoCurrentUser);
    app.delete("/api/project/deleteEventById/:eventId/:userId",deleteEventById);

    function createEvent(req,res){
        var userId=req.params.currentUserId;
        var newEvent=req.body;

        var eventCreated=userEventModel.createNewEvent(userId,newEvent);
        res.json(eventCreated);
    }

    function findEventsFoCurrentUser(req,res){
        var userId=req.params.userId;
        var events=userEventModel.findEventsFoCurrentUser(userId);
        res.json(events);
    }

    function deleteEventById(req,res){
        var eventId=req.params.eventId;
        var userId=req.params.userId;
        var events=userEventModel.deleteEventById(eventId,userId);
        res.json(events);

    }
}
