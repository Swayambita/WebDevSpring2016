(function(){
    angular.module("EventBuilderApp")
        .controller("HomeController",HomeController);

    function HomeController($rootScope,$http,$location,UserLocationService) {
        var vm = this;
        var latitude=null;
        var longitude=null;
        var SEARCH_URL=null;
        var url;
        var i;
        vm.categories = ["Music", "Sports", "Business", "Cooking", "Yoga", "Educational"];
        function init() {
            UserLocationService.getLocation(
                function (position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    SEARCH_URL = "https://www.eventbriteapi.com/v3/events/search/?popular=on&location.latitude=LATITUDE&" +
                        "location.longitude=LONGITUDE&token=YOGCILSQP3UVN2EFLRPC";
                    url = SEARCH_URL.replace("LATITUDE", latitude);
                    url = url.replace("LONGITUDE", longitude);
                    $http.get(url).success(renderSearchResult);
                }
            );
        }
        init();

        function renderSearchResult(response) {
            for( i=0;i<9;i++) {
                if(response.events[i].logo != null) {
                        response.events[i].listed=response.events[i].logo.url;
                }
                else{
                    response.events[i].listed="../client/views/assets/paper_img/friends5.jpg";
                }
            }
            vm.searchResult = response;
        }
    }
})();

