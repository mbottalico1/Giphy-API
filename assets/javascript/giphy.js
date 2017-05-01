$(document).ready(function () {
	//find a way to make this work in a different way. Instead add this attribute to the variable topics and get rid of buttons in html, create them in javascript?
	var topics = ['Michael Scott', 'Dwight Schrute', 'Shane Walsh', 'Rick Grimes'];

	$('#Michael').append(topics[0]);
	$('#Dwight').append(topics[1]);
	$('#Shane').append(topics[2]);
	$('#Rick').append(topics[3]);

	$('button').on('click', function() {
		var person = $(this).attr("button");

		//might need new api key. Most likely
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + person + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gif = $('<div class="item">');

				var rating = results[i].rating;

				var p = $('<p>').text('Rating: ' + rating);

				var image = $('<img>');
				image.attr('src', results[i].images.fixed_height.url);

				gif.prepend(p);
				gif.prepend(image);

				$('#GoT-buttons').prepend(gif);
			}
		})
	});
});
