$(document).ready(function() {

    var topics = ['I am the one who knocks', 'Yeah, b*tch! Magnets!', 'Dont drink and drive. But if you do, call me.', 'D.E.A', 'No more half measures, Walter', 'What does a man do Walter? A man provides', 'The King of The North', 'A girl has no name', 'Thats what I do, I drink and I know things', 'My name is Reek'];

    $('#Walter').append(topics[0]);
    $('#Jesse').append(topics[1]);
    $('#Saul').append(topics[2]);
    $('#Hank').append(topics[3]);
    $('#Mike').append(topics[4]);
    $('#Gus').append(topics[5]);
    $('#Jon').append(topics[6]);
    $('#Arya').append(topics[7]);
    $('#Tyrion').append(topics[8]);
    $('#Theon').append(topics[9]);


    $('button').on('click', function() {
        /*
        The .attr function is used to retrieve an attribute from an HTML element.
        This means that if you had a button like this

        <button data-value='tom' id='tom'>Tom</button>

        you would use .attr to get 'data-value' attribute, like this:

        var person = $(this).attr('data-value');

        */

        var person = $(this).attr("data-value");
        console.log('person: ' + person);



        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + person + '&api_key=dc6zaTOxFJmzC&limit=10';
        console.log('queryURL: ' + queryURL);

    

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
                    image.attr('data-still', results[i].images.fixed_height_still.url);
                    image.attr('data-animate', results[i].images.fixed_height.url);


                    // add the p and img tag to the new div
                    gif.prepend(p);
                    gif.prepend(image);

                    // Add the new div to the dom
                    $('#imgAnimate').prepend(gif);
                }
            })

    });


    $(document).on("click", "img", function() {

        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');

        } else {

            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');

        }

    })




});
