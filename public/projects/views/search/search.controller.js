
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location){
    //    var SEARCH_URL="https://www.eventbriteapi.com/v3/EVENT/?token=QIICLGXF4EEU6TEADMWB";
       var SEARCH_URL="https://www.eventbriteapi.com/v3/categories/?token=YOGCILSQP3UVN2EFLRPC";

        $location.url("/search");
        $scope.searchEvent=searchEvent;

        function searchEvent(event) {
            var event = $scope.event;
            var url = SEARCH_URL.replace("EVENT", event);
         //   url = url.replace("PAGE", currentPage);

            $.ajax({
                url: url,
                success: renderSearchResults
            });
        }

        function renderSearchResults(response){
            console.log(response);
        }

    }
})();