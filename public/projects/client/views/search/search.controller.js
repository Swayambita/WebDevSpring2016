(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($location,$http,$routeParams){

        var vm=this;

       // var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&popular=on&venue.city=boston&token=YOGCILSQP3UVN2EFLRPC";
        var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&popular=on&token=YOGCILSQP3UVN2EFLRPC";
        var someEvent = $routeParams.someEvent ;
        vm.searchEvent=searchEvent;

        if(someEvent){
            searchEvent(someEvent);
        }

       /* function searchEvent(event) {
            $scope.eventToSearch=event;
            $location.url("/search/"+event);
            var url = SEARCH_URL.replace("EVENT", event);
            $http.get(url).success(renderSearchResult);
        }*/

        function searchEvent(event){
            var search="";

            if(event.category!=null){
                search=event.category;
            }

            if(event.location!=null){
                // if space present replace with a plus..need to implement this.
                search=search+"&venue.city="+event.location;
            }
            else{
                search=search+"&venue.city=boston";
            }

            vm.eventToSearch=event;
            $location.url("/search/"+search);
            var url = SEARCH_URL.replace("EVENT", search);
            console.log("the url", url);
            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){
            vm.searchResult=response;
        }
    }
})();