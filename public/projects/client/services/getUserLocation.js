(function() {
    "use strict";
    angular.module("EventBuilderApp")
        .factory("UserLocationService",UserLocationService);


    function UserLocationService(){
        var model={
            getLocation :getLocation
        };
        return model;

        function getLocation(callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(callback);
            } else {
                console.log("error while fetching the location of user");
            }
        }
    }
})();
