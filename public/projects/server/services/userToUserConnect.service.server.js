module.exports = function(app,userToUserConnectModel) {

    app.post("/api/project/userTofollow/:loggedInUser/:userToFollow/:user/:followerName", followUser);
    app.get("/api/project/getFollowers/:userId",getFollowers);
    app.get("/api/project/getWhomAmFollowing/:userId",getWhomAmFollowing);
    app.put("/api/project/unFollowUser/:followerId/:userId",unFollowUser);

    function followUser(req, res) {
        var loggedInUser = req.params.loggedInUser ;
        var userToFollow= req.params.userToFollow  ;
        var userToFollowName = req.params.user  ;
        var followerName = req.params.followerName;

        userToUserConnectModel.checkConnect(userToFollow,loggedInUser)
            .then(function(response){
                    if(response==null){
                        userToUserConnectModel.followUser(loggedInUser,userToFollow,userToFollowName,followerName)
                            .then(function (resp) {
                                    res.json(resp);
                                },
                                function (err) {
                                    res.status(400).send(err);
                                });
                    }
                    else{
                        return res.json(response)
                    }
                },
                function(err){
                    res.status(400).send(err);
                })
    }

    function getFollowers(req,res){
        var userId= req.params.userId;
        userToUserConnectModel.getFollowers(userId)
            .then(function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getWhomAmFollowing(req,res){
        var userId= req.params.userId;
        userToUserConnectModel.getWhomAmFollowing(userId)
            .then(function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function unFollowUser(req,res){
        var userId= req.params.userId;
        var followerId= req.params.followerId;
        userToUserConnectModel.unFollowUser(followerId,userId)
            .then(function (resp) {
                    res.json(resp);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
}