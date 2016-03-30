(function(){
    angular.module("EventBuilderApp")
        .controller("HomeController",HomeController);

    function HomeController($rootScope,$http,UserLocationService){
        console.log("from homecontroller 1st");

        var vm=this;

        var latitude=$rootScope.latitude;
        var longitude=$rootScope.longitude;

        console.log("latitude",latitude);
        console.log("longitude",longitude);
        // var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=EVENT&popular=on&token=YOGCILSQP3UVN2EFLRPC";
        var SEARCH_URL="https://www.eventbriteapi.com/v3/events/search/?q=music&popular=on&location.latitude=LATITUDE&location.longitude=LONGITUDE&token=YOGCILSQP3UVN2EFLRPC";

        var url=SEARCH_URL.replace("LATITUDE",latitude);
        url=url.replace("LONGITUDE",longitude);

        $http.get(url).success(renderSearchResult);
    }

    function renderSearchResult(response){
        vm.searchResult=response;
        console.log("vm.result",vm.searchResult);
    }

})();

