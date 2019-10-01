$(document).ready(function () {

    var searchDate = moment().format("YYYY-MM-ddTHH:mm:ss.ss±hh:mm");

    var queryURL = 'https://newsapi.org/v2/everything?' +
        'q=Ultimate Fighting Championship&' +
        'from=' + searchDate +
        'sortBy=popularity&' +
        'apiKey=111a9f85a73d4bce961da2f278698314';

    //Firebase config stuff:
    var firebaseConfig = {
        apiKey: "AIzaSyBVOM2HpHfMO8EVSpR-1rVhA4ln5_BYBv4",
        authDomain: "ufcnewsapp.firebaseapp.com",
        databaseURL: "https://ufcnewsapp.firebaseio.com",
        projectId: "ufcnewsapp",
        storageBucket: "",
        messagingSenderId: "504166437038",
        appId: "1:504166437038:web:551f16f5c4eaacc5285d3f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var ufcData = response.articles;
        console.log(ufcData);
        for (i = 0; i < ufcData.length / 2; i++) {
            //Create the div to hold the card:
            var addTopLevelDiv = $("#newsHolder").append($("<div>").addClass("card m-2 border border-dark").attr("data-ufc", ufcData[i].title));
            //Create the card title
            var title = $("<a>").addClass("article-link text").attr("id", i).attr("href", ufcData[i].url).attr("target", "_blank");
            txt = title.text(ufcData[i].description);
            if (txt[0].text.length > 10) {
                title.text(txt[0].text.substring(0, 100) + " ... Read More");
            };
            var saveButton = $("<button>").addClass("btn-sm bg-dark text").attr("data-url", ufcData[i].url).attr("data-title", ufcData[i].title).text("Save Article");
            var cardHeader = $("<div>").addClass("p-2").append(title);
            var cardFooter = $("<div>").addClass("p-2").append(saveButton);
            addTopLevelDiv.append(cardHeader).append(cardFooter);
        
        //Save article button
        saveButton.on("click", function () {
            var title = $(this).attr("data-title");
            var url = $(this).attr("data-url");
            //console.log($(this).attr("data-title"));
            database.ref().push({
                title,
                url,
            });
        });
    };
        database.ref().on("child_added", function (childSnapshot) {
            //Add articles to article holder
            $("#savedArticles").append("<div class='card m-2 border-dark'>").append("<div class= card-header <span class='Article Title'>" +
                childSnapshot.val().title + "</span></div>").append("<div class = card-header <span> <a href=" + childSnapshot.val().url + "<span class='Article URL'>" + childSnapshot.val().url +
                    " </span> </a> </div>");
            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    });
});

