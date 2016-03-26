(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($routeParams,$http,$rootScope){

        var vm=this;
        var eventID= $routeParams.eventID;
        var currentUser=$rootScope.currentUser;

        vm.likeEvent=likeEvent;
        vm.bookmarkEvent=bookmarkEvent;
        vm.message=null;

        $http.get("https://www.eventbriteapi.com/v3/events/"+eventID+"/?token=YOGCILSQP3UVN2EFLRPC")
                .success(renderDetails);

        console.log("inside controller");

        function renderDetails(response){
            vm.details=response;
        }

        function likeEvent(){
            console.log("inside like function");
            if(currentUser==null){
                vm.message="You need to logged in to like the event";
            }
            else{
                vm.message="Event Liked!!";
            }
        }


        function bookmarkEvent(){
            if(currentUser==null){
                vm.message="You need to logged in to bookmark the event";
            }
            else{
                vm.message="Comment Saved!!";
            }
        }

        function commentEvent(){
            if(currentUser==null){
                vm.message="You need to logged in to bookmark the event";
            }
            else{

            }
        }
    }
})();