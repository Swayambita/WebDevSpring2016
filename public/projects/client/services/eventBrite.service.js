(function() {
    "use strict";
    angular.module("EventBuilderApp")
        .factory("EventBriteService",EventBriteService);


    function EventBriteService($location,$http){
        var model={
            getSearchResult :getSearchResult,
            getDetails:getDetails
        };
        return model;

        function getSearchResult(category,city) {

            var search="";

            search=search+category;
            search=search+"&venue.city="+city;

            var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&popular=on&token=YOGCILSQP3UVN2EFLRPC";
            var url=SEARCH_URL.replace("EVENT",search);
            $location.url("/search"+"/"+category+"/"+city);
            return $http.get(url);

        }

        function getDetails(eventId){
            console.log("the details of eventid",eventId);
            return $http.get("https://www.eventbriteapi.com/v3/events/"+eventId+"/?token=YOGCILSQP3UVN2EFLRPC")

        }

    }

})();
