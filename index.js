$(document).ready(function () {

    //APIs:
    //CORS Anywhere:
    var corsAnywhere = "https://upenn-cors-server.herokuapp.com/";
    //Specific competitor info:
    var specCompURL = 'http://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/summaries.json?api_key=';
    //Specific competitor profile:
    var specCompProfURL = 'http://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/profile.json?api_key=';
    //UFC Seasons
    var ufcSeasons = "http://api.sportradar.us/ufc/trial/v2/en/seasons.json?api_key=";
    //Sport Radar API
    var sportRadarAPI = "ywt2ucxtf9drabwswbvx863g";
    //Ticket Master api key:
    var ticketMasterAPI = "RDPrWYOojToRbPLsg0Ah8DnWO7cMXk10";

    findFighter = function () {
        //To find a fighter:
        //Get list of seasons:
        var seasons = [];
        var seasonInfo = [];
        var fighterNames = [];
        var fighterIds = [];
        $.ajax({
            type: "GET",
            url: (corsAnywhere + ufcSeasons + sportRadarAPI),
            async: true,
            dataType: "json",
        }).then(function (json) {
            for (i = 0; i < 10; i++) {
                seasons.push(json.seasons[i].id);
                seasonInfo.push("http://api.sportradar.us/ufc/trial/v2/en/seasons/" + seasons[i] + "/info.json?api_key=" + sportRadarAPI);
            };
            //Then log the names of the fighters to the fighterNames array:
            for (i = 0; i < seasonInfo.length; i++) {
                $.ajax({
                    type: "GET",
                    url: (corsAnywhere + seasonInfo[i]),
                    dataType: "json"
                }).then(function (json_seasonInfo) {
                    console.log(json_seasonInfo);
                    for (i = 0; i < json_seasonInfo.competitors.length; i++) {
                        fighterNames.push(json_seasonInfo.competitors[i].name);
                        //Use fighterIds to search through specCompProfURL
                        fighterIds.push(json_seasonInfo.competitors[i].id);
                        console.log(fighterIds);
                    };
                });
            };
        });
    };

    $("#submitButton").on("click", function () {
        event.preventDefault();

        findFighter();

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

        //Search for a fighter if their name is included in the 

    });

});

