
(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location){
        $location.url("/search");

    }



})();