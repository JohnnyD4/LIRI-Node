var fs = require("fs");

var request = require("request");

var keysNeeded = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var twitter = keysNeeded.twitterKeys;

var spotify = keysNeeded.spotifyKeys;

var userChoice = process.argv[2];

var entertainmentChoice = process.argv[3];

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
	
	var client = new Twitter ({
		consumer_key: twitter.consumer_key,
		consumer_secret: twitter.consumer_secret,
		access_token_key: twitter.access_token_key,
		access_token_secret: twitter.access_token_secret	
	})

	var params = {screen_name: 'KWeisman5'};

	client.get('statuses/user_timeline', params, function(err, tweets, response) {
		
		if (err) throw err;
		
		console.log(tweets[0].user.name);

		for (var i = 0; i < 5; i++) {
		
			console.log("My tweet: -----> ", tweets[i].text);
		
			console.log("Created at: ", tweets[i].created_at);
		
			fs.appendFile("log.txt", "\n" + tweets[i].text + "\n" + tweets[i].created_at + "\n", "utf8", function(err) {
				if (err) throw err;
				console.log("Tweet was added to log.txt");
			})
		}
		
	})

	
}

function getSpotifySong() {

	if(!(entertainmentChoice)) {
		entertainmentChoice = "The Sign"
	}

	var spotifyClient = new Spotify ({
		id: spotify.client_id,
		secret: spotify.client_secret
	})
	
	spotifyClient.search({type: 'track', query: entertainmentChoice, limit: 1}, function(err, data) {

		if (err) throw err;

		var topChoice = data.tracks.items[0];

		console.log(topChoice.album.artists[0].name);

		console.log(topChoice.name);

		console.log(topChoice.album.name);

		console.log(topChoice.preview_url);

		fs.appendFile("log.txt", "\n" + topChoice.album.artists[0].name + "\n" + topChoice.name + "\n" + topChoice.album.name + "\n" + topChoice.preview_url + "\n", "utf8", function(err) {
			if (err) throw err;

			console.log("Spotify music was added to log.txt");
		})
	})
}

function getMovie() {
	// 
	// Not working, placement is off I guess
	// 
	if (!(entertainmentChoice)) {
			
			entertainmentChoice = "Mr. Nobody";
			
		}

	

	queryUrl = "http://www.omdbapi.com/?t=" + entertainmentChoice + "&y=&plot=short&apikey=40e9cece";

	// console.log(queryUrl);

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

		fs.appendFile("log.txt", "\n" + parsed.Title + "\n", "utf8", function(err) {
			if(err) throw err;
		})

		
	})
}

function getText() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		
		if (err) throw err;

		var dataArray = data.split(",")
		
		userChoice = dataArray[0];

		entertainmentChoice = dataArray[1];

		getSpotifySong();

		
	})
	
}



