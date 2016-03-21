(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("DetailsController",DetailsController);

    function DetailsController($scope,$routeParams,$http){
            var eventID= $routeParams.eventID;
            $http.get("https://www.eventbriteapi.com/v3/events/"+eventID+"/?token=YOGCILSQP3UVN2EFLRPC")
                .success(renderDetails);

        function renderDetails(response){
            $scope.details=response;
        }
    }
})();