(function(){
    "use strict";
    angular.module("EventBuilderApp")
        .controller("SearchController",SearchController);

    function SearchController($routeParams,EventBriteService,UserEventService){
        var vm=this;
        var someEvent = $routeParams.someEvent;
        var someLocation=$routeParams.someLocation;
        var genredata=null;
        var len=null;
        var i=null;
        vm.searchEvent=searchEvent;
        vm.searchLoading=false;

        function init(){

        }
        init();

        if(someEvent!=null && someLocation!=null){
            searchEvent(someEvent,someLocation);
        }

        function searchEvent(category,city){
            vm.searchLoading=true;

            if(category==null){
                category="music";
            }

            if(city==null){
                city="boston";
            }

            category=category.toLowerCase();
            city=city.toLowerCase();

            vm.eventToSearch=category;
            vm.eventLocation=city;

            EventBriteService.getSearchResult(category,city)
                .then(function(response){
                    len=response.data.events.length;

                    for( i=0;i<len;i++) {
                        if(response.data.events[i].logo != null) {
                            response.data.events[i].listed=response.data.events[i].logo.url;
                        }
                        else{
                            response.data.events[i].listed="../client/views/assets/paper_img/friends5.jpg";
                        }
                    }
                    UserEventService.getLiveEventsForGenre(category,city)
                        .then(function(res){
                                vm.dbSearch= res.data;
                            },
                            function(error){

                            })
                    vm.searchResult=response.data.events;
                    vm.searchLoading=false;
                })
        }
    }
})();