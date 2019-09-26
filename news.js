$(document).ready(function () {

    var searchDate = moment().format("YYYY-MM-ddTHH:mm:ss.ss±hh:mm");

    var queryURL = 'https://newsapi.org/v2/everything?' +
        'q=Ultimate Fighting Championship&' +
        'from=' + searchDate +
        'sortBy=popularity&' +
        'apiKey=111a9f85a73d4bce961da2f278698314';

    $.ajax({
            url: queryURL,
            method: "GET"
         }).then(function (response) {
          var ufcData = response.articles;
          console.log(ufcData);
          for (i = 0; i < ufcData.length; i++){
            //Create the div to hold the card:
            var addTopLevelDiv = $("#newsHolder").append($("<div>").addClass("card m-2 border border-dark").attr("data-ufc", ufcData[i].description));
            //Create the card title
            var title = $("<a>").addClass("article-link text-primary").attr("href", ufcData[i].url);
            title.text(ufcData[i].description);
            var cardHeader = $("<div>").addClass("p-2").append(title);
            addTopLevelDiv.append(cardHeader);
          };
         });

});

