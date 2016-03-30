(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("FavouriteEventsController",FavouriteEventsController);

    function FavouriteEventsController($rootScope,UserService){
        var vm=this;
        vm.unlike=unlike;
        vm.uncomment=uncomment;

        vm.message=null;

       var userId=$rootScope.currentUser._id;

        console.log("these");
        function init(){
            console.log("these are");
            UserService.getFavEvents(userId)
                .then(function(response){
                    vm.favEvents=response.data;
                    console.log("these are the favoutire eventes",response.data);
                })
        }
        init();

        function unlike(){

        }

        function uncomment(){

        }

    }
})();

