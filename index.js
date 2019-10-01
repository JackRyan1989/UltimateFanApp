$(document).ready(function () {

    //APIs:
    //CORS Anywhere:
    var corsAnywhere = "https://upenn-cors-server.herokuapp.com/";
    //Ticket Master api key:
    var ticketMasterAPI = "RDPrWYOojToRbPLsg0Ah8DnWO7cMXk10";
    //UFC Fighter info url:
    var ufcURL = "http://media.ufc.com/fighter/";

    $("#submitButton").on("click", function () {
        event.preventDefault();

        //Fighter search function:
        var userFighter = $("#fighterInput").val().trim().toLowerCase();
        var fighterSplit  = userFighter.split(" ");
        var userFighterURL = (fighterSplit[0] + "-" + fighterSplit[1]);
        $.get((corsAnywhere + ufcURL + userFighterURL), function(data){
            var html = $(data);
            var fightHistory = html[209].childNodes[15].childNodes[87].childNodes[1].childNodes[1].childNodes[5].childNodes[1];
            var fighterInfo = fightHistory.children[5].children[1].children[0];
            var nickName = $(fighterInfo.children[0].children[1]).text();
            var from = $(fighterInfo.children[2].children[1]).text();
            var age = $(fighterInfo.children[3].children[1]).text();
            var height = $(fighterInfo.children[4].children[1]).text();
            var weight = $(fighterInfo.children[5].children[1]).text();
            var armReach = $(fighterInfo.children[6].children[1]).text();
            var legReach = $(fighterInfo.children[7].children[1]).text();
            var record = $(fightHistory.children[4].children[2].children[0].children[0].children[1]).text();
            var mostRecentFight = $(fightHistory.children[11].children[1].children[0].children[0].children[1].children[2].children[0]).text();
        });
        
    
        //Location search function:
        var city = $("#cityInput").val().trim();
        var keyWord = "ufc";
        var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + keyWord + "&countryCode=US&city=" + city + "&apikey=" + ticketMasterAPI;
        $("#eventNameList").empty();
        $("#numBouts").empty();
        $.ajax({
            type: "GET",
            url: tmURL,
            async: true,
            dataType: "json",
            success: function (json) {
                if (!(city === "")) {
                    if (!(json._embedded)) {
                        $("#locationFailModal").modal("toggle");
                        $("#locationSpan").text(city);
                    } else {
                        $("#numBouts").append(json._embedded.events.length);
                        $("#foundLocSpan").text(city);
                    };
                    //Loop through event.urls to create fight links:
                    var eventURLs = [];
                    var eventNames = [];
                    for (i = 0; i < json._embedded.events.length; i++) {
                        eventURLs.push(json._embedded.events[i].url);
                        eventNames.push(json._embedded.events[i].name);
                        eventURLCol = $("<a>").attr("href", eventURLs[i]).attr("target", "_blank").text(eventNames[i]);
                        eventNameCol = $("<div>").addClass("m-2 p-2 border border-primary rounded").append(eventURLCol);
                        $("#eventNameList").append(eventNameCol);
                    };
                    $("#boutFoundModal").modal("toggle");
                };
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        });
    });
});

