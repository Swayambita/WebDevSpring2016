(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($location,$http,$routeParams){
        var vm=this;
        var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&popular=on&token=YOGCILSQP3UVN2EFLRPC";

        var someEvent = $routeParams.someEvent;
        var someLocation=$routeParams.someLocation;

        if(someEvent!=null && someLocation!=null){
            searchEvent(someEvent,someLocation);
        }
        vm.searchEvent=searchEvent;

        function init(){

        }
        init();

        function searchEvent(category,city){
            var search="";

            if(category!=null){
                search=search+category;
            }
            else{
                category="music";
                search="music";
            }

            if(city!=null){
                search=search+"&venue.city="+city;
            }
            else{
                city="boston";
                search=search+"&venue.city=boston";
            }

            var url=SEARCH_URL.replace("EVENT",search);
            vm.eventToSearch=category;
            vm.eventLocation=city;
            console.log("the url",url);
            $location.url("/search"+"/"+category+"/"+city);
            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){
            console.log("the eventbrite response",response);

            for(var e in response.events){
                var d1=response.events[e].start.local.substring(0,10);
                var d2=response.events[e].end.local.substring(0,10);
                response.events[e].startDate=d1;
                response.events[e].endDate=d2;
            }
            vm.searchResult=response.events;
            console.log("vm.result",vm.searchResult);
        }
    }
})();