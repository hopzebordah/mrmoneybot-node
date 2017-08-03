var config = require('./config')
var Twit = require('twit')
var fs = require('fs')
var tweetPrep = require('./tweetPrep')

//assigning twitter client attributes
var bot = new Twit ({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});

//assigning values that correspond to ensuring reliable bot operation n stuff
var bot_screen_name = config.bot_screen_name
var bot_id = config.bot_id

var owner_screen_name = config.owner_screen_name
var owner_id = config.owner_id

//this area contains temporary variables
var filename = 'tester.txt'
var tweetTemp = ''

//yes yes yes !YES !!
var stream = bot.stream('statuses/filter', {track: bot_screen_name})

stream.on('tweet', function (tweet) {
	//log relevant data and metadata of tweet	
	console.log('Tweet incoming:')

	console.log('	User handle: @' + tweet.user.screen_name)
	console.log('	User id: ' + tweet.user.id_str)
	console.log('	Tweet id: ' + tweet.id_str)
	console.log('	Tweet: ' + tweet.text)
	
	//if the bot is mentioned by its owner, then log money and description and
	//reply with a status update on the interpreted data of that tweet.
	if (tweet.user.id_str === owner_id || tweet.user.screen_name === owner_screen_name) {
		console.log('	This was my MASTER!')
		console.log('	Now logging and replying to tweet...')
	
		tweetTemp = tweetPrep(tweet.text)
		
		//console.log(tweetTemp)
		
		if (tweetTemp === null) {
			console.log('	No valid monetary value was located.')
			console.log('	Informing user...')
			bot.post('statuses/update', {in_reply_to_status_id: tweet.id_str, 
				status: 'ERROR: hello, @' + tweet.user.screen_name + ' . I could not find a valid monetary value, or I found too many.'},
				function (err, data, response) {
					if (err)
						console.log(err)
					else
						console.log('	Reply successful.')
				}
			)
		}
		else {
			console.log('	Monetary value with description acquired!')
			fs.stat(filename, function (err, stat) {
				if (err === null) {
					console.log('	File exists, appending to file')
					tweetTemp += '\n'
					fs.appendFile(filename, tweetTemp, function (err) {
						if (err) {
							console.log('ERROR ON FILE APPEND' + err.code)
						}
						else {
							console.log('	Notifying user of successful process...')									
							bot.post('statuses/update', {in_reply_to_status_id: tweet.id_str, 
								status: 'hello, @' + tweet.user.screen_name + '. I\'ve added this to today\'s file: ' + tweetTemp},
								function (err, data, response) {
									if (err)
										console.log(err)
									else
										console.log('	Reply successful.')
								}
							)
						}
					})
				} 
				else if (err.code === 'ENOENT') {
					console.log('	No prior file exits, creating new and logging tweet')
					tweetTemp += '\n'
					fs.writeFile(filename, tweetTemp, function (err) {
						if (err) {
							console.log('ERROR ON FILE WRITE' + err.code)
						}	
						else {					
							console.log('	Notifying user of successful process...')				
							bot.post('statuses/update', {in_reply_to_status_id: tweet.id_str, 
								status: 'hello, @' + tweet.user.screen_name + '. I\'ve added this to today\'s file: ' + tweetTemp},
								function (err, data, response) {
									if (err)
										console.log(err)
									else
										console.log('	Reply successful.')
								}
							)
						}
					})
				} 
				else {
					console.log('Something happened: ' + err.code)
				}	
	
			})
		}
	}	

	//if the bot tweets @ itself, then do nothing. no infinite loops please	
	else if (tweet.user.id_str === bot_id && tweet.user.screen_name === bot_screen_name) {
		console.log('	I have tweeted myself!')
		console.log('	Not replying to tweet.')
	}

	//if the bot is mentioned by someone other than the owner, then display a 
	//message of general discontent with a recommendation to contact the bot's author.
	else {
		console.log('	Unknown user!')
		console.log('	Now replying to tweet...')
		bot.post('statuses/update', 
			{in_reply_to_status_id: tweet.id_str, 
			status: 'hello, @' + tweet.user.screen_name + '. I am not authorized to reply to you. Please contact @aalcocerpeters for more information.'},
			function (err, data, response) {
				if (err)
					console.log(err)
				else
					console.log('	Reply successful.')
			}
		)
	}
})


