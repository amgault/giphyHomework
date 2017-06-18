var topics = ['Dog', 'Cat', 'skunk', 'Lion', 'Tiger'];
// http://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q={search term}

var queryURL = 'http://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q=';

var searchTerm = null;

function getImages(topic) {
	var fullUrl = queryURL + topic;

	$.ajax({
		url: fullUrl,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		displayImages(response);
	});
}	

function displayImages(images) {
	$('#images').empty();

	for(var i = 0; i < images.data.length; i++) {
		var imgDIV = $('<div>');
		var img = $('<img>');
		var rating = $('<p>');
		imgDIV.addClass('images');
		img.addClass('image');
		console.log(images.data[i].images.downsized.url);
		img.attr('data-still', images.data[i].images.downsized_still.url);
		img.attr('data-animate', images.data[i].images.downsized.url);
		img.attr('src', images.data[i].images.downsized_still.url);
		img.attr('data-state', 'still');
		rating.html('Rating: ' + images.data[i].rating);
		imgDIV.append(rating);
		imgDIV.append(img);
		$('#images').append(imgDIV);
	}
}

function displayButtons(buttons) {

	$('#buttons').empty();
	
	for(var i = 0; i < buttons.length; i++) {
		console.log('hi');
		var button = $('<button>');
		button.addClass('topic btn btn-info')
		button.attr('data-name', buttons[i]);
		button.html(buttons[i]);
		$('#buttons').append(button);
	}
}

$("#images").on("click", ".image", function() {
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	event.preventDefault();

	console.log($(this).attr("data-state"));

	var state = $(this).attr("data-state");
	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
	});

	$("#buttons").on("click", ".topic", function() {
		event.preventDefault();
		console.log($(this).attr("data-name"));
		searchTerm = $(this).attr("data-name");

		getImages(searchTerm);
	});

	$("#add-topic").on("click", function() {

		event.preventDefault();

		var topic = $("#topic-input").val().trim();
		topics.push(topic);
		console.log(topics);

		displayButtons(topics);
	});

displayButtons(topics);