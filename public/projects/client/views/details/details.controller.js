(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($routeParams,$rootScope,EventBriteService,UserEventService){

        var vm=this;
        var eventID= $routeParams.eventID;
        var fetchFrom=$routeParams.fetch;
        var currentUser=$rootScope.currentUser;
        vm.fetch=fetchFrom;
        vm.likeEvent=likeEvent;
        vm.bookmarkEvent=bookmarkEvent;
        vm.message=null;
        vm.detailName=null;

        if($rootScope.currentUser){
            vm.userId=$rootScope.currentUser._id;
        }
        else{
            vm.userId=null;
        }

        function init(){

            if(fetchFrom=="api"){
                EventBriteService.getDetails(eventID)
                    .then(function(response){
                        vm.detailName=response.data.name.text;
                        vm.desc=response.data.description.text;
                        vm.start=response.data.start.local;
                        vm.end=response.data.end.local;

                        if(response.data.logo!=null){
                            vm.image=response.data.logo.url;
                        }
                        else{
                            vm.image="../client/views/assets/paper_img/friends5.jpg";
                        }
                    });
            }
            else{
                UserEventService.getDetailsOfEvent(eventID)
                    .then(function(response){
                        vm.detailName=response.data.eName;
                        vm.desc=response.data.desc;
                        vm.start=response.data.sDate;
                        vm.end=response.data.eDate;
                    })
            }
            UserEventService.allUsersWhoLikeThisEvent(eventID)
                .then(function(response){
                    vm.allUsersWhoLikedThis=response.data;
                })

        }
        init();

        function likeEvent(){
            if(currentUser==null){
                alert("You need to be logged in to like an event");
            }
            else{
                UserEventService.userLikesEvent(currentUser._id,eventID,currentUser,vm.detailName,fetchFrom)
                    .then(function(response,err) {
                        if (err) {
                            console.log("error when tried to like the event", err);
                        }
                        else {
                            alert("Event liked!!");
                        }
                    });
            }
        }

        function bookmarkEvent(){
            if(currentUser==null){
                alert("You need to be logged in to bookmark an event");
            }
            else{
                UserEventService.userBookMarksEvent(currentUser._id,eventID,currentUser,vm.detailName,fetchFrom)
                    .then(function(response,err) {
                        if (err) {
                            console.log("error when tried to bookmark the event", err);
                        }
                        else {
                            alert("Event bookmarked!!");
                        }
                    });
            }
        }
    }
})();