var topics = ["ford", "jeep", "nissan", "toyota", "volvo"];

for (let i = 0; i < topics.length; i++) {
  var button = $("<button>").text(topics[i]);
  button.attr("data-car", topics[i]);
  button.addClass("btn btn-primary giftasticButton");
  $(".buttonsGoHere").append(button);
}

$("#addACar").on("click", function (event) {
  event.preventDefault();

  var newCar = $("#carBrand").val().trim();
  console.log(newCar);

  topics.push(newCar);

  var newButton = $("<button>").text(newCar.toLowerCase());
  newButton.attr("data-car", newCar);
  newButton.addClass("btn btn-primary giftasticButton");
  $(".buttonsGoHere").append(newButton);

  $("#carBrand").val("");
});

$(document).on("click", ".giftasticButton", function () {
  var car = $(this).attr("data-car");
  var queryURL =
    "https://api.giphy.com/v/gifs/search?q=" +
    car +
    "&api_key=wOG7tp1BxEsge0hphXh5fbNymSpBhq49&limit=0";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var results = response.data;
    console.log(results);

    var gifContainer = $("<div class ='gifContainer col-md-'>");

    for (let i = 0; i < results.length; i++) {
      let rating = results[i].rating;
      let p = $("<p>").text("Rating: " + rating);
      let GIF = $("<img class='result'>");

      GIF.attr("src", results[i].images.fixed_height_still.url);
      GIF.attr("data-state", "still");
      GIF.attr("data-still", results[i].images.fixed_height_still.url);
      GIF.attr("data-animate", results[i].images.fixed_height.url);

      gifContainer.prepend(GIF);
      gifContainer.prepend(p);
      $(".gifsGoHere").prepend(gifContainer);
    }
  });

  $(document).on("click", ".result", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
