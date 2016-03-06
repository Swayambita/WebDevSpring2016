
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location,$http){
    //    var SEARCH_URL="https://www.eventbriteapi.com/v3/EVENT/?token=QIICLGXF4EEU6TEADMWB";
       var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?token=YOGCILSQP3UVN2EFLRPC";

        $location.url("/search");
        $scope.searchEvent=searchEvent;
        $scope.searchResult=[];

        function searchEvent(event) {
            var event = $scope.event;
            var url = SEARCH_URL.replace("EVENT", event);
         //   url = url.replace("PAGE", currentPage);

        /*    $.ajax({
                url: url,
                success: renderSearchResults}); */

            $http.get(url).success(renderSearchResult);
        }

        function renderSearchResult(response){
            console.log(response);
            $scope.searchResult=response;

           /* for(var e=0; e<events.length; e++){

                var event = events[e].name.text;
                var ehtml=events[e].name.html;
                var desc= events[e].decsription.text;
                var eid=events[e].id;
                var sDate=events[e].start.local;
                var eDate=events[e].end.local;
                var capacity=events[e].capacity;
                var image=events[e].logo.url;
            }*/
        }

    }
})();