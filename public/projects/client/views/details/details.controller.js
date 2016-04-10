(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($routeParams,$http,$rootScope,EventBriteService,UserEventService){

        var vm=this;
        var eventID= $routeParams.eventID;
        var currentUser=$rootScope.currentUser;

        vm.likeEvent=likeEvent;
        vm.bookmarkEvent=bookmarkEvent;
        vm.commentEvent=commentEvent;
        vm.message=null;
        vm.allUsersWhoLikedThis =["henry","bob"];

        function init(){

         /*   UserEventService.findAllUsersWhoLikeThisEvent(eventId)
                .then(function(response){

                },
                function(error){

                });*/
        }
        init();

        EventBriteService.getDetails(eventID)
            .then(function(response){

                console.log("at details controller",response);
                vm.details=response.data;
            })

        function renderDetails(response){
            vm.details=response;
        }

        function likeEvent(){
            if(currentUser==null){
                vm.message="You need to be logged in to like an event";
            }
            else{
                UserEventService.userLikesEvent(currentUser._id,eventID)
                    .then(function(response){
                        vm.message="Event Liked!!";
                        // need to call the getLikes after this event function,
                        // to get updated like list for the user
                    });
            }
        }

        function bookmarkEvent(){
            if(currentUser==null){
                vm.message="You need to be logged in to bookmark an event";
            }
            else{
                UserEventService.userBookMarksEvent(currentUser._id,eventID)
                    .then(function(response){
                        vm.message="Event bookmarked!!";
                        // need to call the getBookmark for this event function,
                        // to get updated bookmark list
                    });
            }
        }

        function commentEvent(comment){
            if(currentUser==null){
                vm.message="You need to be logged in to comment on an event";
            }
            else{
                UserEventService.userCommentsEvent(currentUser._id,eventID,comment)
                    .then(function(response){
                        vm.message="Comment Saved!";
                        // need to call the getComments for this event function,
                        // to get updated comments list
                    });
            }
        }
    }
})();