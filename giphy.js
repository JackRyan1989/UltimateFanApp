$(document).ready(function () {
    $("#submitButton").on("click", function () {
        var topic = $("#fighterInput").val().trim();
        event.preventDefault();
        $("#fighters").empty();
        var apiKey = "rNdXDLNYthIjN88XMIVsVMmBK57fR2jJ";

        var url = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=" + apiKey;

        //populates images to the page
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            $.each(results, function () {
                var item = this;
                var stillImageUrl = item.images.downsized_still.url;

                //this animates the images
                var fighterCard = $("<div>")
                fighterCard.addClass("card col-4")
                var fighterImage = $("<img>").attr({
                    src: item.images.original.url,
                    class: "img-fluid card-img-top mx-auto d-block",
                    id: "gif-img",
                    "data-still": item.images.original_still.url,
                    "data-animate": item.images.original.url,
                    "data-state": "still"
                });

                fighterCard.append(fighterImage);
                //they animate when clicked
                fighterCard.on("click", function () {
                    if (fighterImage.attr("data-state") === "still") {
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




