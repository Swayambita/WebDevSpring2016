module.exports = function(app,userToUserConnectModel) {

    app.post("/api/project/userTofollow/:loggedInUser/:userToFollow/:user/:followerName", followUser);

    function followUser(req, res) {
        var loggedInUser = req.params.loggedInUser ;
        var userToFollow= req.params.userToFollow  ;
        var userToFollowName = req.params.user  ;
        var followerName = req.params.followerName  ;

        console.log("*****",loggedInUser);
        console.log("*****",userToFollow);
        console.log("*****",userToFollowName);
        console.log("*****",followerName);

        userToUserConnectModel.followUser(loggedInUser,followerName,userToFollow,userToFollowName)
            .then(function (resp) {
                    console.log("***** resp",resp);




                },
                function (err) {

                    console.log("***** err",err);

                });
    }
}