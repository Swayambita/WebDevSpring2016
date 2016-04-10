(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($routeParams,EventBriteService,UserEventService){
        var vm=this;

        var someEvent = $routeParams.someEvent;
        var someLocation=$routeParams.someLocation;

        var genredata;
        var apiResult;

        console.log('am printing url evnet',someEvent);
        console.log('am printing url location',someLocation);

        vm.searchEvent=searchEvent;

        function init(){

        }
        init();

        if(someEvent!=null && someLocation!=null){
            searchEvent(someEvent,someLocation);
        }

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
                    for(var e in response.data.events){
                        var d1=response.data.events[e].start.local.substring(0,10);
                        var d2=response.data.events[e].end.local.substring(0,10);
                        response.data.events[e].startDate=d1;
                        response.data.events[e].endDate=d2;
                        apiResult=response.data.events;
                    }

                    UserEventService.getLiveEventsForGenre(category,city)
                        .then(function(res){
                            genredata= res.data;
                            console.log("teh mongodata result",genredata);
                        },
                        function(error){

                        })

                    //append result from api and from our db together

                    vm.searchResult=response.data.events;
                    console.log("vm.result",vm.searchResult);

                    //vm.searchResult=apiResult;
                    //console.log("vm.result",vm.searchResult);
                })
        }


    }


})();