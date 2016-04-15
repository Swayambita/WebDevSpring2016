module.exports = function(app,userEventModel) {
    app.post("/api/project/createEvent/:currentUserId",createEvent);
    app.get("/api/project/getAllEvent/user/:userId",findEventsFoCurrentUser);
    app.delete("/api/project/deleteEventById/:eventId/:userId",deleteEventById);
    app.put("/api/project/updateEvent/:eventId",updateEventById);
   // app.post("/api/project/userEventConnect/:userId/event/:eventId",userLikesEvent);
   // app.post("/api/project/userBookMarksEvent/:userId/event/:eventId",userBookMarksEvent);
   // app.post("/api/project/userCommentsEvent/:userId/event/:eventId",userCommentsEvent);
    app.put("/api/project/goLive/:eventId",goLiveEvent);
    app.get("/api/project/getLive/:category/:city",getLive);
    app.get("/api/project/getEventInfo/:eventId",getEventInfo);


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

    function findEventsFoCurrentUser(req,res){
        var userId=req.params.userId;
        userEventModel.findEventsFoCurrentUser(userId)
            .then(function(resp){
                    res.json(resp);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteEventById(req,res){
        var eventId=req.params.eventId;
        var userId=req.params.userId;
        userEventModel.deleteEventById(eventId,userId)
            .then(function(resp){
                    //need to find the updated list of events for this user
                    userEventModel.findEventsFoCurrentUser(userId)
                        .then(function(resp){
                                res.json(resp);
                            },
                            function(err){
                                res.status(400).send(err);
                            });

                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateEventById(req,res){
        var eventId=req.params.eventId;
        var event=req.body;
        var userId=event.createdBy;
        userEventModel.updateEventById(eventId,event)
            .then(function(resp){
                    //need to find the updated list of events for this user
                    userEventModel.findEventsFoCurrentUser(userId)
                        .then(function(resp){
                                res.json(resp);
                            },
                            function(err){
                                res.status(400).send(err);
                            });

                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function goLiveEvent(req,res){
        var eventId=req.params.eventId;
        var event=req.body;
        userEventModel.goLive(eventId,event)
            .then(function(resp){
                res.json(resp);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getLive(req,res){
        var category=req.params.category;
        var location=req.params.city;
        userEventModel.getLive(category,location)
            .then(function(resp){
                    res.json(resp);
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function getEventInfo(req,res){
        var eventId=req.params.eventId;
        userEventModel.findEventById(eventId)
            .then(function(resp){
                    res.json(resp);
                },
                function(err){
                    res.status(400).send(err);
                });
    }
}
