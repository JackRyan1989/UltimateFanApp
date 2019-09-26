$(document).ready(function () {

    //Apis:
    //Specific competitor info:
    var specCompURL = 'http://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/summaries.json?api_key=ywt2ucxtf9drabwswbvx863g';
    //Specific competitor profile:
    var specCompProfURL = 'http://api.sportradar.us/ufc/trial/v2/en/competitors/sr:competitor:237660/profile.json?api_key=ywt2ucxtf9drabwswbvx863g';
    //Stub Hub api key:
    var stubHubApiKey = "T1DZyGIApA99dALmjSw4I5SAmfdwQoPO";
    //Ticket Master api key:
    var ticketMasterAPI  = "RDPrWYOojToRbPLsg0Ah8DnWO7cMXk10";

    $("#submitButton").on("click", function () {
        event.preventDefault();
        var city = $("#cityInput").val().trim();
        var state = $("#stateInput").val().trim();
        var keyWord = "ufc";
        var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword="+keyWord+"&countryCode=US&city="+city+"&state="+state+"&apikey="+ticketMasterAPI;
        console.log(tmURL);
        $.ajax({
            type:"GET",
            url: tmURL,
            async:true,
            dataType: "json",
            success: function(json) {
                        console.log(json);
                        if (!(json._embedded)) {
                        console.log("Search somewhere else");
                        };
                     },
            error: function(xhr, status, err) {
                        // This time, we do not end up here!
                     }
          });
        });
});

