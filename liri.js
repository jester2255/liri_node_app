var client = require("./keys.js")
var client2 = require("./spoty")
var inquirer = require("inquirer");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var $ = require("jquery");

//---------------------------making sure request works-----------
	/*request('http://www.google.com', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  //console.log('body:', body); // Print the HTML for the Google homepage. 
	});*/

//---------------------------making sure the keys are passed -----------
/*for(i in client){
	console.log(i, client);
}
console.log(client.twitterKeys.consumer_key)*/

//----------------Making it so liri.js can take in a command--------------------
inquirer
  .prompt([
  		{
	  		type: "list",
	  		message: "Please Pick One",
	  		choices:[ "my-tweets" ,"spotify-this-song","movie-this", "do-what-it-says"],
	  		name: "listChoice"	
  		},
  		{
		    type: "confirm",
		    message: "Are you sure:",
		    name: "confirm",
		    default: true
    	}
  	])
  //-----------------------------------------making choices do something
	.then(function(inquirerResponse) {
  		//console.log(inquirerResponse);
  		 if (inquirerResponse.confirm) {
  		 	switch(inquirerResponse.listChoice){
  		 		case "my-tweets":
  		 		myChirps()
  		 		break;

  		 		case "spotify-this-song":
  		 		singToMe();
  		 		break;

  		 		case "movie-this":
  		 		lightsCameraAction()
  		 		break;

  		 		case "do-what-it-says":
  		 		doAsISay()
  		 		break;

  		 	}
  		 	
  		}else{
  			console.log("sorry try again")
  		}
  });
//--------------------------------------functions go here-----------------------------------------

function myChirps(){
	console.log(client)
	client = new Twitter
	({
	consumer_key: client.twitterKeys.consumer_key,
	consumer_secret: client.twitterKeys.consumer_secret,
	access_token_key: client.twitterKeys.access_token_key,
	access_token_secret: client.twitterKeys.access_token_secret
	})

		client.get('favorites/list', {screen_name: "Jester2255"} ,function(error, tweets, response) {
		if(error) {
			console.log(error)
		}else{
		console.log(tweets);  // The favorites. 
		//console.log(response);  // Raw response object.

		console.log("\nThe movie's title is: " + JSON.parse(data)._header);
		} 
		});

}
//------------------------------------------------------------------------------------------------------------------
function singToMe(){
	// this should get a song name and display the artist/s, the song name, preview link and album
	var songArg = []
		var spotify = Spotify({
  id: "1cf1e01d57234cc2a24e9271ab625b37",
  secret: "a9dd3f455f9e4519b96794df3420b905"
});
		inquirer
	  .prompt([
	    // Here we create a basic text prompt.
	    {
	      type: "input",
	      message: "What song would you like to learn about?",
	      name: "movieName"
	    },
	    {
	      type: "confirm",
	      message: "Are you sure:",
	      name: "confirm",
	      default: true
	    }
	    ])
	  .then(function(inquirerResponse) {
  		 if (inquirerResponse.confirm) {
		  		songArg.push(inquirerResponse.songName)
		  		JSON.stringify(songArg)
		  		//console.log(movieArg)
		  		for (var i = 0; i < songArg.length; i++) {
		    	songTitle = songArg[i]
  		 	}
 
/*spotify.search({ type: 'track', query: 'let it be' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
console.log("\nSomething is: " + JSON.stringify(data).total);
});*/

/*spotify
  .search({ type: 'track', query: 'rocky racoon' })
  .then(function(response) {
    console.log(response);
    console.log("\nSomething is: " + JSON.stringify(response).total);
  })
  .catch(function(err) {
    console.log(err);
  });*/

spotify
  //.request('https://api.spotify.com/v1/search?q=' + songTitle + '&type=track&limit=2')
  /*$.ajax({
  	url:'https://api.spotify.com/v1/search?q=let+it+be&type=track&limit=1',
  	method: 'GET'
  }).done(function(response){
  		console.log("This is the Response: " + response)
  })*/
  .request('https://api.spotify.com/v1/search?q=let+it+be&type=track&limit=1')
  .then(function(data) {
    console.log(data);
    //console.log(JSON.stringify(data)) 
    console.log("\nSomething is: " + JSON.stringify(data).tracks);
  })
  	.catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

  		}else{
  			console.log("sorry try again")
  		}
  });
}
//-----------------------------------------------------------------------------------------------------------------
function lightsCameraAction(){
	var movieTitle = "mr nobody"
	var movieArg = []
		
	inquirer
	  .prompt([
	    // Here we create a basic text prompt.
	    {
	      type: "input",
	      message: "What movie would you like to learn about?",
	      name: "movieName"
	    },
	    {
	      type: "confirm",
	      message: "Are you sure:",
	      name: "confirm",
	      default: true
	    }
	    ])
	  .then(function(inquirerResponse) {
  		 if (inquirerResponse.confirm) {
		  		movieArg.push(inquirerResponse.movieName)
		  		JSON.stringify(movieArg)
		  		//console.log(movieArg)
		  		for (var i = 0; i < movieArg.length; i++) {
		    	movieTitle = movieArg[i]
  		 	}
  		 	//console.log(movieTitle);
  		 	request("http://www.omdbapi.com/?t=" +movieTitle+ "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			  // If the request is successful (i.e. if the response status code is 200)
			  if (!error && response.statusCode === 200) {
			  	//console.log(JSON.parse(body));
		    console.log("\nThe movie's title is: " + JSON.parse(body).Title);
		    console.log("\nThe movie's year is: " + JSON.parse(body).Year);
		    console.log("\nThe movie's IMDB rating is: " + JSON.parse(body).imdbRating);
		    console.log("\nThe movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
		    console.log("\nThe movie was produced in: " + JSON.parse(body).Country);
		    console.log("\nThe movie's language is: " + JSON.parse(body).Language);
		    console.log("\nThe movie's plot is: " + JSON.parse(body).Plot);
			console.log("\nThe actors of the movie are: " + JSON.parse(body).Actors);
		  }
});
  		}else{
  			console.log("sorry try again")
  		}
  });
}
//-----------------------------------------------------------------------------------------------------------------
function doAsISay(){
	/*Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
	Feel free to change the text in that document to test out the feature for other commands.*/
	console.log("Do it");
};