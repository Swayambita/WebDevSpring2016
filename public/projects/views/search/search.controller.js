(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location,$http,$routeParams){

        var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&venue.city=boston&token=YOGCILSQP3UVN2EFLRPC";
        var someEvent = $routeParams.someEvent ;
        $scope.searchEvent=searchEvent;

        if(someEvent){
            searchEvent(someEvent);
        }

        function searchEvent(event) {
            $scope.eventToSearch=event;
            $location.url("/search/"+event);
            var url = SEARCH_URL.replace("EVENT", event);
            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){
            $scope.searchResult=response;
        }
    }
})();