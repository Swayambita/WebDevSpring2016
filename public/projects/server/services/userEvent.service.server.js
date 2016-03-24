module.exports = function(app,userEventModel) {
    app.post("/api/project/createEvent/:currentUserId",createEvent);
    app.get("/api/project/getAllEvent/user/:userId",findEventsFoCurrentUser);
    app.delete("/api/project/deleteEventById/:eventId/:userId",deleteEventById);
    app.put("/api/project/updateEvent/:eventId",updateEventById);

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

    function updateEventById(req,res){
        console.log("in server service");
        var eventId=req.params.eventId;
        var event=req.body;
        var events=userEventModel.updateEventById(eventId,event);
        res.json(events);
    }
}
