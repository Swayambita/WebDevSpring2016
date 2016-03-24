(function() {
    "use strict";
    angular.module("EventBuilderApp")
        .factory("UserLocationService",UserLocationService);


    function UserLocationService($rootScope){
        var model={
            getLocation :getLocation
        };

        return model;

        function getLocation() {
            console.log("in the new service");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }


        function showPosition(position) {
            $rootScope.latitude=position.coords.latitude;
            $rootScope.longitude=position.coords.longitude;

            console.log("6666",$rootScope.latitude);
            console.log("6666",$rootScope.longitude);
        }

    }

})();
