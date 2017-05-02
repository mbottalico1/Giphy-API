$(document).ready(function () {
	//find a way to make this work in a different way. Instead add this attribute to the variable topics and get rid of buttons in html, create them in javascript?
	var topics = ['Michael Scott', 'Dwight Schrute', 'Shane Walsh', 'Rick Grimes'];

	$('#Michael').append(topics[0]);
	$('#Dwight').append(topics[1]);
	$('#Shane').append(topics[2]);
	$('#Rick').append(topics[3]);

	$('button').on('click', function() {
		/*
		The .attr function is used to retrieve an attribute from an HTML element.
		This means that if you had a button like this

		<button data-value='tom' id='tom'>Tom</button>

		you would use .attr to get 'data-value' attribute, like this:

		var person = $(this).attr('data-value');

		In your case, you don't have any attributes except "id" on your button. And you
		definitely don't have an attribute called "button". Your HTML element is a "button",
		but it doesn't have an attribute called button.
		*/

		var person = $(this).attr("button");
		console.log('person: ' + person);

		//might need new api key. Most likely
		/*
		Your query URL is appending the value of the "person" variable. What is the value?

		If the value of person was "Michael", then your URL would look like this:

		'http://api.giphy.com/v1/gifs/search?q=Michael&api_key=dc6zaTOxFJmzC&limit=10'

		If the value of person was "Dwight", then your URL would look like this:

		'http://api.giphy.com/v1/gifs/search?q=Dwight&api_key=dc6zaTOxFJmzC&limit=10'
		*/
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + person + '&api_key=dc6zaTOxFJmzC&limit=10';
		console.log('queryURL: ' + queryURL);

		/*

		!IMPORTANT!
		Before reading this, make sure you go to your Web Developer Tools and look at the console!

		The issue is this:

		person = undefined
		queryURL = http://api.giphy.com/v1/gifs/search?q=undefined&api_key=dc6zaTOxFJmzC&limit=10

		Notice how the URL contains "undefined"? That's not right, yeah!?

		So when you make your request, you're getting a set of results for the query "undefined".
		*/

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			var results = response.data;
			console.log('results', results);

			// for every image we got back in results
			for (var i = 0; i < results.length; i++) {
				// Creates a new DIV
				var gif = $('<div class="item">');

				var rating = results[i].rating;

				// Creates a new Paragraph and adds the rating as textContent
				var p = $('<p>').text('Rating: ' + rating);

				// Create an image tag
				var image = $('<img>');

				// set the src attribute of the image tag equal to the correct url
				image.attr('src', results[i].images.fixed_height.url);

				// add the p and img tag to the new div
				gif.prepend(p);
				gif.prepend(image);

				// Add the new div to the dom
				$('#GoT-buttons').prepend(gif);
			}
		})
	});
});
