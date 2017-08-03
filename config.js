require('dotenv').config()

var config = {}

config.consumer_key = process.env.consumer_key
config.consumer_secret = process.env.consumer_secret
config.access_token = process.env.access_token
config.access_token_secret = process.env.access_token_secret

config.bot_screen_name = ''       //your bot's screen name (without the @, i.e. realDonaldTrump
config.bot_id = ''                //your bot's user id (some string of numbers, i.e. '123123123123')

config.owner_screen_name = ''     //the bot's owner's screen name 
config.owner_id = ''              //the bot's owner's user id 

module.exports = config
