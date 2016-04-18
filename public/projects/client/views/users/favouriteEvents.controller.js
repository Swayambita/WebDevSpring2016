(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("FavouriteEventsController",FavouriteEventsController);

    function FavouriteEventsController($rootScope,UserEventService){
        var vm=this;
        vm.unlikeEvent=unlikeEvent;
        vm.unbookmarkEvent=unbookmarkEvent;
        vm.favEvents=null;

        vm.message=null;

       var userId=$rootScope.currentUser._id;
        function init(){
            UserEventService.getFavEvents(userId)
                .then(function(response){

                    if(response.data.length>0){
                        vm.favEvents=response.data;
                    }
                    else{
                        vm.favEvents=null;
                        vm.message="No events liked or bookmarked yet";
                    }
                },
                function(err){
                    console.log("error while getting the favourite events of user",err);
                })
        }
        init();

        function unlikeEvent(eventId){
            UserEventService.unlikeEvent(eventId,userId)
                .then(function(response){
                    init();
                },
                function(err){
                    console.log("error while unliking the event",err);
                })
        }

        function unbookmarkEvent(eventId){
            UserEventService.unbookmarkEvent(eventId,userId)
                .then(function(response){
                        init();
                    },
                    function(err){
                        console.log("error while unbookmark the event",err);
                    })
        }
    }

})();

