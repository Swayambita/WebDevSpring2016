
(function(){
    "use strict";
    angular
        .module("EventBuilderApp")
        .controller("MyEvents",MyEvents);

    function MyEvents($location,UserEventService,$rootScope){

        var vm=this;
        var currentUser=$rootScope.currentUser;
        var eventToDelete=null;
        var eventId=null;
        var prevEvent=null;
        var changedEvent=null;
        var date1=null;
        var date2=null;
        var eventSelected=null;
        vm.message=null;
        vm.updateEvent=updateEvent;
        vm.selectEvent=selectEvent;
        vm.deleteEvent=deleteEvent;
        vm.goLive=goLive;
        vm.cancelEdit=cancelEdit;
        vm.selectEventForEdit =false;
        vm.events=null;

        function init()
        {
            if ($rootScope.currentUser == null) {
                $location.url("/home");
            }
            else {
                var currentUser = $rootScope.currentUser;
                UserEventService.findEventsFoCurrentUser(currentUser._id)
                    .then(function (response) {
                        if(response.data.length>0){
                            vm.events = response.data;
                        }
                        else{
                            vm.events=null;
                            vm.message="No events created by you yet";
                        }

                    });
            }
        }
        init();


        function deleteEvent(index){
            vm.eventIndexSelected = index;
            eventToDelete=vm.events[index]._id;
            UserEventService.deleteEventById(eventToDelete,currentUser._id)
                .then(function(response){
                    vm.events=response.data;
                    vm.eventIndexSelected=null;
                    vm.eName=null;
                })
        }

        function selectEvent(index) {
            vm.selectEventForEdit=true;
            vm.eventIndexSelected = index;
            vm.eName = vm.events[index].eName;
            vm.eDesc = vm.events[index].desc;
            vm.newSDate= new Date(vm.events[index].sDate);
            vm.newSTime=new Date(vm.events[index].sTime);
            vm.newEDate=new Date(vm.events[index].eDate);
            vm.newETime=new Date(vm.events[index].eTime);
            vm.newLocation=vm.events[index].location;
            vm.newGenre=vm.events[index].genre;
        }
        function updateEvent(eName,eDesc,newSDate,newSTime,newEDate,newETime,newLocation,newGenre) {
            newGenre=newGenre.toLowerCase();
            newLocation=newLocation.toLowerCase();

            if (eName == null || eDesc == null) {
                vm.alertMessage = "Enter the required fields";
            }
            else {
                 eventId = vm.events[vm.eventIndexSelected]._id;
                 prevEvent = vm.events[vm.eventIndexSelected];

                 changedEvent = {"eName": eName,
                    "sDate": newSDate, "eDate": newEDate, "createdBy": prevEvent.createdBy,
                    "desc": eDesc, "image": prevEvent.image,
                    "sTime":newSTime,"eTime":newETime,"location":newLocation,"genre":newGenre};

                UserEventService.updateEventById(eventId,changedEvent)
                    .then(finalList);
            }
        }

        function finalList(response){
            UserEventService.findEventsFoCurrentUser(currentUser._id)
                .then(function(response){
                        if(response.data) {
                            vm.events=response.data;
                            for(var e in vm.events){
                                date1=vm.events[e].sDate.substring(0,10);
                                vm.events[e].sDate=date1;

                                date2=vm.events[e].eDate.substring(0,10);
                                vm.events[e].eDate=date2;
                            }
                            vm.eventIndexSelected=null;
                            vm.eName=null;
                            vm.eDesc=null;
                            vm.newSDate=null;
                            vm.newSTime=null;
                            vm.newEDate=null;
                            vm.newETime=null;
                            vm.selectEventForEdit=false;
                        }
                    },
                    function(error){
                        vm.message="error";
                    });

        }

        function goLive(index){
            vm.eventIndexSelected = index;
            eventSelected = vm.events[index];
            UserEventService.goLive(eventSelected._id,eventSelected)
                .then(function(response){
                        vm.message="Your event is live now";
                    },
                    function(error){
                        vm.message="error";
                    });
        }

        function cancelEdit(){
            vm.selectEventForEdit=false;

        }
    }
})();