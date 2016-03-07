
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location,$http,$routeParams){
    //    var SEARCH_URL="https://www.eventbriteapi.com/v3/EVENT/?token=QIICLGXF4EEU6TEADMWB";

        var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&token=YOGCILSQP3UVN2EFLRPC";

        var eventId = $routeParams.eventId;
        var event = $scope.event;
        $location.url("/search");
        $scope.searchEvent=searchEvent;

        // check this function, this is for maintaining the URL for to and fro in the search page
        if(eventId){
            searchEvent(event);
        }

        function searchEvent(event) {

           // var event = $scope.event;
            var url = SEARCH_URL.replace("EVENT", event);
         //   url = url.replace("PAGE", currentPage);

            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){
            console.log(response);
            $scope.searchResult=response;
        }

    }
})();