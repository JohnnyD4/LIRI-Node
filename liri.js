var twitterKeysNeeded = require("./keys.js");

var twitter = twitterKeysNeeded.twitterKeys;

var userChoice = process.argv[2];

var entertainmentChoice = process.argv[3];

var request = require("request");

var queryUrl;


switch (userChoice) {
	case 'my-tweets':
		getTweets();
		break;

	case 'spotify-this-song':
		getSpotifySong();
		break;

	case 'movie-this':
		getMovie();
		break;

	case 'do-what-it-says':
		getText();
		break;

	default:
		console.log("Not a proper option.");
		break;
}

function getTweets() {
	console.log("Tweet");
}

function getSpotifySong() {
	console.log("Song");
	console.log(entertainmentChoice);
}

function getMovie() {
	queryUrl = "http://www.omdbapi.com/?t=" + entertainmentChoice + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function (err, response, body) {
		
		if(err) throw err;

		var parsed = JSON.parse(body);

		console.log("Title: ", parsed.Title);

		console.log("Year Realeased: ", parsed.Year);

		console.log("IMDB Rating: ", parsed.imdbRating);

		console.log("Country Produced in: ", parsed.Country);

		console.log("Language: ", parsed.Language);

		console.log("Plot: ", parsed.Plot);

		console.log("Cast: ", parsed.Actors);

		console.log("Rotten Tomatoes Score: ", parsed.Ratings[1].Value);
	})
}

function getText() {
	console.log("Text");
}



