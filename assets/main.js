// Initial set of topics
var topics = ['Dog', 'Cat', 'Skunk', 'Lion', 'Tiger'];

// API base url (minus search term)
var queryURL = 'https://api.giphy.com/v1/gifs/search?limit=10&api_key=dc6zaTOxFJmzC&q=';

// Variable to store search term
var searchTerm = null;

// Makes a call to the API to get the giphy's related to the specified search term
function getImages(topic) {
	// appends our search term to the api url
	var fullUrl = queryURL + topic;

	$.ajax({
		url: fullUrl,
		method: 'GET'
	}).done(function(response) {
		displayImages(response);
	});
}	

// Displays each of the images pulled from the API and their rating
function displayImages(images) {
	$('#images').empty();

	for(var i = 0; i < images.data.length; i++) {

		// creates div, img, and p elements for each giphy
		var imgDIV = $('<div>');
		var img = $('<img>');
		var rating = $('<p>');

		// sets the attributes of the div and img elements
		imgDIV.addClass('images');
		img.addClass('image');
		img.attr('data-still', images.data[i].images.downsized_still.url);
		img.attr('data-animate', images.data[i].images.downsized.url);
		img.attr('src', images.data[i].images.downsized_still.url);
		img.attr('data-state', 'still');

		// adds the rating to the p element
		rating.html('Rating: ' + images.data[i].rating);

		// appends the image and and rating to our image div. then appends image div to our web app
		imgDIV.append(rating);
		imgDIV.append(img);
		$('#images').append(imgDIV);
	}
}

// Creates and displays our topic buttons
function displayButtons(buttons) {

	$('#buttons').empty();
	
	for(var i = 0; i < buttons.length; i++) {
		var button = $('<button>');
		button.addClass('topic btn btn-info')
		button.attr('data-name', buttons[i]);
		button.html(buttons[i]);
		$('#buttons').append(button);
	}
}

// If a giphy images is clicked
$("#images").on("click", ".image", function() {

	// prevents refreshing of page
	event.preventDefault();

	// grabs the state of our clicked giphy
	var state = $(this).attr("data-state");

	// if the state is still, change the img src attribute and data-state to animate
	// else change the img src attribute and data-state to still
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

// If a topic button is clicked
$("#buttons").on("click", ".topic", function() {

	// prevents refreshing of page
	event.preventDefault();

	// updates our search term with the button we selected
	searchTerm = $(this).attr("data-name");

	getImages(searchTerm);
});

// If a new topic is submitted
$("#add-topic").on("click", function() {

	// prevents refreshing of page
	event.preventDefault();

	// gets and adds new topic to the array of topics
	var topic = $("#topic-input").val().trim();
	topics.push(topic);

	// displays all the buttons again
	displayButtons(topics);
});

displayButtons(topics);


