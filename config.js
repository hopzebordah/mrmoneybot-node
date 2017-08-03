require('dotenv').config()

var config = {}

config.consumer_key = process.env.consumer_key
config.consumer_secret = process.env.consumer_secret
config.access_token = process.env.access_token
config.access_token_secret = process.env.access_token_secret

config.bot_screen_name = 'mrmoneybot'
config.bot_id = '832445967320358912'

config.owner_screen_name = 'aalcocerpeters'
config.owner_id = '2178124183'

module.exports = config
