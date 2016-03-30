(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($routeParams,EventBriteService){
        var vm=this;

        var someEvent = $routeParams.someEvent;
        var someLocation=$routeParams.someLocation;
        if(someEvent!=null && someLocation!=null){
            searchEvent(someEvent,someLocation);
        }

        console.log('am printing url evnet',someEvent);
        console.log('am printing url location',someLocation);

        vm.searchEvent=searchEvent;

        function init(){

        }
        init();

        function searchEvent(category,city){

            if(category==null){
                category="music";
            }

            if(city==null){
                city="boston";
            }

            vm.eventToSearch=category;
            vm.eventLocation=city;

            EventBriteService.getSearchResult(category,city)
                .then(function(response){
                    console.log("here in controller the response", response.data.events);

                    for(var e in response.data.events){
                        var d1=response.data.events[e].start.local.substring(0,10);
                        var d2=response.data.events[e].end.local.substring(0,10);
                        response.data.events[e].startDate=d1;
                        response.data.events[e].endDate=d2;
                    }
                    vm.searchResult=response.data.events;
                    console.log("vm.result",vm.searchResult);

                })
        }


    }


})();