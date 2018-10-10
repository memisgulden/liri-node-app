require('dotenv').config();


// Spotify API //
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
});

var userInput = process.argv[3];

spotify
    .search({ type: 'track', query: userInput, limit: 1})
    .then(function (response) {
        console.log("----------------------");
        console.log("Artist Name: " + response.tracks.items[0].album.artists[0].name);
        console.log("Track: " + response.tracks.items[0].name);
        console.log("Spotify Link: " + response.tracks.items[0].external_urls.spotify);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("----------------------");
    })
    .catch(function (err) {
        console.error('Error occurred: ' + err);
    });


