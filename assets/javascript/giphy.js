$(document).ready(function () {
    //Array for searched topics to be added
    var topics = [];


    function displayBasketballPlayer() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=CEBe4JDP4KlxxuK3ImACniTHApHCR8Zr&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var showDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                showImage.attr("src", staticSrc);
                showImage.addClass("basketballGiphy");
                showImage.attr("data-state", "animate");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);

            }
        });
    }

    //Submit button click event takes search term from form input, trims and pushes to topics array
    $("#addPlayer").on("click", function (event) {
        event.preventDefault();
        var newPlayer = $("#basketballInput").val().trim();
        topics.push(newPlayer);
        console.log(topics);
        $("#basketballInput").val('');
        displayButtons();
    });

    //Function loops through topics array to display button with array values 
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "player");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    //Click event on button that executes displayBasketballPlayer function
    $(document).on("click", "#player", displayBasketballPlayer);

    //Click event on gifs to pause Gifs 
    $(document).on("click", ".netflixGiphy", pausePlayGifs);

    //Function goes into data-state attribute and depending on status, changes image source to data-animate or data-still
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});