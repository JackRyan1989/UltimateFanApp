$(document).ready(function () {

    //Apis:
    //Specific competitor info:
    var specCompURL = 'https://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/summaries.json?api_key=ywt2ucxtf9drabwswbvx863g';
    //Specific competitor profile:
    var specCompProfURL = 'https://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/profile.json?api_key=ywt2ucxtf9drabwswbvx863g';
    //Ticket Master api key:
    var ticketMasterAPI = "RDPrWYOojToRbPLsg0Ah8DnWO7cMXk10";

    $("#submitButton").on("click", function () {
        event.preventDefault();

        //Fighter search functions
        $.ajax({
            type: "GET",
            url: specCompProfURL,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
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
