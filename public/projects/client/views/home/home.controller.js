(function(){
    angular.module("EventBuilderApp")
        .controller("HomeController",HomeController);

    function HomeController($rootScope,$http,$location,UserLocationService) {
        console.log("from homecontroller 1st");

        var vm = this;
        vm.categories = ["Music", "Sports", "Business", "Cooking", "Yoga", "Educational"];
        function init() {
            UserLocationService.getLocation(
                function (position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    var SEARCH_URL = "https://www.eventbriteapi.com/v3/events/search/?popular=on&location.latitude=LATITUDE&" +
                        "location.longitude=LONGITUDE&token=YOGCILSQP3UVN2EFLRPC";
                    var url = SEARCH_URL.replace("LATITUDE", latitude);
                    url = url.replace("LONGITUDE", longitude);

                    $http.get(url).success(renderSearchResult);
                }
            );
        }
        init();

        function renderSearchResult(response) {
            vm.searchResult = response;
            console.log("vm.result", vm.searchResult);
        }

    }
})();

