module.exports = function(app,userEventConnectModel) {

    app.post("/api/project/userLikeEvent/:userId/event/:eventId/:eName/:source", userLikesEvent);
    app.post("/api/project/userBookmarkEvent/:userId/event/:eventId/:eName/:source",userBookMarksEvent);
    app.get("/api/project/allUserLikeThisEvent/:eventId",allUserLikeThisEvent);
   // app.get("/api/project/eventsLikedByuser/:userId",eventsLikedByuser);
    app.get("/api/project/getFavEvents/:userId",getFavEvents);
    app.put("/api/project/unlikeEvent/:eventId/:userId",unlikeEvent);
    app.put("/api/project/unbookmarkEvent/:eventId/:userId",unbookmarkEvent);

    function createEvent(req, res) {
        var userId = req.params.currentUserId;
        var newEvent = req.body;

        userEventModel.createNewEvent(userId, newEvent)
            .then(function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function userLikesEvent(req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        var eName = req.params.eName;
        var source = req.params.source;
        var user=req.body;

        userEventConnectModel.findConnection(userId, eventId)
            .then(function(resp){
               if(resp!= null){
                   id=resp._id;
                   userEventConnectModel.addLike(id,resp)
                       .then(function(doc){
                           res.json(doc);
                       },function(err){
                           res.status(400).send(err);
                       });
               }
                else{
                   userEventConnectModel.newLike(userId,eventId,user,eName,source)
                       .then(function(doc){
                           res.json(doc);
                       },function(err){
                           res.status(400).send(err);
                       });
               }
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function userBookMarksEvent(req,res){
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        var eName = req.params.eName;
        var source = req.params.source;
        var user=req.body;


        userEventConnectModel.findConnection(userId, eventId)
            .then(function(resp){
                    if(resp!= null){
                        id=resp._id;
                        userEventConnectModel.addBookMark(id,resp)
                            .then(function(doc){
                                res.json(doc);
                            },function(err){
                                res.status(400).send(err);
                            });
                    }
                    else{
                        userEventConnectModel.newBookMark(userId,eventId,user,eName,source)
                            .then(function(doc){
                                res.json(doc);
                            },function(err){
                                res.status(400).send(err);
                            });
                    }
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function allUserLikeThisEvent(req,res){
        var eventId = req.params.eventId;
        userEventConnectModel.allUserLikeThisEvent(eventId)
            .then(function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

  /*  function eventsLikedByuser(req,res){
        var userId = req.params.userId;
        userEventConnectModel.eventsLikedByuser(userId)
            .then(function (resp) {

                },
                function (err) {
                    res.status(400).send(err);
                });
    }*/

    function getFavEvents(req,res){
        var userId=req.params.userId;
        userEventConnectModel.getFavEvents(userId)
            .then(function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unlikeEvent(req,res){
        var eventId = req.params.eventId;
        var userId=req.params.userId;


        userEventConnectModel.findConnection(userId,eventId)
            .then(function(resp) {
                id = resp._id;
                userEventConnectModel.unlikeEvent(id, resp)
                    .then(function (doc) {
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    });
            },
            function(err){
               res.status(400).send(err);
            });

    }

    function unbookmarkEvent(req,res){
        var eventId = req.params.eventId;
        var userId=req.params.userId;
        userEventConnectModel.findConnection(userId,eventId)
            .then(function(resp) {
                    id = resp._id;
                    userEventConnectModel.unbookmarkEvent(id, resp)
                        .then(function (doc) {
                            res.json(doc);
                        }, function (err) {
                            res.status(400).send(err);
                        });
                },
                function(err){
                    res.status(400).send(err);
                });

    }
}
