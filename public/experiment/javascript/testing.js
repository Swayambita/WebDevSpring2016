(function()  {
    $(init);
    var $eventSearchID;
    var $searchBtn;
    var SEARCH_URL="http://eventful.com/json/events?q=EVENTS";

    function init() {
        $eventSearchID=$("#eventSearchID");
        $searchBtn=$("#searchBtn");

        $searchBtn.click(searchEvent);

        alert("hello");
     }

    function searchEvent(){
        var event = $eventSearchID.val();
        var url=SEARCH_URL.replace("EVENTS",event);
        alert("url "+ url);
        alert("url "+ url);

        $.ajax({
             url: url,
            success: renderResults
            });
    }

    function renderResults(response){
        console.log("hello");
    }
})();


