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
          for (i = 0; i < ufcData.length; i++){
            
          };
         });

});
