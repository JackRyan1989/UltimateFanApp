$(document).ready(function () {

//var fighterSelected = "";

//creates newTopic onclick event
// $("#newTopic").on("click", function () {
//     var button = $("<button>");
//     button.text($("#userTopic").val())
//     button.addClass("ufcButton")
//     $("#ufcButtons").append(button);
//     attachEvent();
// })


// //generates buttons used on page
// //makeButtons();
// function makeButtons() {
//     $("#ufcButtons").empty();

//     for (v in topic) {
//         console.log(v)
//         console.log(topic[v])
//         var ufcButton = $("<button>");
//         ufcButton.text(topic[v]);
//         ufcButton.addClass("ufcButton")
//         $("#ufcButtons").append(ufcButton);
//     }

//     attachEvent();
// }
//Calls attach event function and clears current gifs when new gifs are created. 
//function attachEvent() {
    $("#submitButton").on("click", function () {
        var topic = $("#fighterInput").val().trim();
        console.log(topic);
       event.preventDefault();
       console.log("Clicked");
        $("#fighters").empty();
        var apiKey = "rNdXDLNYthIjN88XMIVsVMmBK57fR2jJ";
        //fighterSelected = $(this).text();
        var url = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key="+apiKey;
        console.log(url);
//populates images to the page
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            //console.log(results);
            $.each(results, function () {
                var item = this;
                console.log(item)
                var stillImageUrl = item.images.downsized_still.url;
                console.log(stillImageUrl);
                var fighterDiv = $("<div>")
                fighterDiv.addClass("col-sm-4")
//this animates the images
                var fighterCard = $("<div>")
                fighterCard.addClass("card")
                var fighterImage = $("<img>").attr("src", item.images.original.url);
                fighterImage.attr("data-still", item.images.original_still.url)
                fighterImage.attr("data-animate", item.images.original.url)
                fighterImage.attr("data-state", "still")
                fighterImage.addClass("card-img-top");
                fighterCard.append(fighterImage);
//they animate when clicked
                fighterCard.on("click", function () {
                    if (fighterImage.attr("data-state") === "still"){
                        fighterImage.attr("src", item.images.preview_gif.url)
                        fighterImage.attr("data-state", "animated")
                    };
// //appends fighter ID to fighter card. 
                     
                });
                $("#fighters").append(fighterCard); 
            });

        });

   });
});

//makeButtons();
    
//});
    

