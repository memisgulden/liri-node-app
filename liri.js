require('dotenv').config();


// Spotify API //
// node liri.js spotify-this-song "song name" //
if (process.argv[2] === "spotify-this-song") {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    });

    var userInput = process.argv[3];

    spotify
        .search({ type: 'track', query: userInput, limit: 1 })
        .then(function (response) {
            console.log("--------------------------------------");
            console.log("Artist Name: " + response.tracks.items[0].album.artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Spotify Link: " + response.tracks.items[0].external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("--------------------------------------");
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

}


// Bands in Town API //
// node liri.js concert-this <artist/band name here> //
// name of venue, venue location, date // 

if (process.argv[2] === "concert-this") {
    var request = require("request");


    var userInput = process.argv[3];

    request("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var concertData = JSON.parse(body);

            //   Use for loop to go through each upcoming concert & display info
            for (i = 0; i < concertData.length; i++) {
                console.log("Venue: " + concertData[i].venue.name);
                console.log(
                    "City: " +
                    concertData[i].venue.city +
                    ", " +
                    concertData[i].venue.country
                );
            }
        }
    });
}

// OMDB API //
//node liri.js movie-this '<movie name here>' //
if (process.argv[2] === "movie-this") {
    var request = require("request");

    var userInput = process.argv[3];


    request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("--------------------------------------");
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("--------------------------------------");

        }
    })
}