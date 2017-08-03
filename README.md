# mrmoneybot-node
a twitterbot written in nodejs to parse and log tweets containing info about a particular user's spending habits

DEPENDENCIES: dotenv twit

YOU MUST EDIT THE .env AND config.js FILES WITH YOUR PARTICULAR INFORMATION

THE BOT WILL NOT FUNCTION WITHOUT YOUR PRELIMINARY SETUP REEEEEEEEEEEEEEEEE

the bot draw creds (like keys and such) from a .env file.
additional info is needed inside the config.js file

this bot will monitor the tweet stream for incoming tweets from a specific user id that contain a monetary value. 
the bot will then log that monetary value and will separate everything else the tweet contains, and will log 
that as the description.

i am planning on implementing a method that will allow the bot to log in every few minutes and search for past 
tweets that match its criteria, rather than letting it sit on a constant open socket as i have heard that this
is vulnerable (if someone could explain why, that would be beautiful). that may be so, but it's also super 
annoying to have to pull out of a remote shell only to see that your program has terminated. i feel like this 
is too trivial a task for screen/tmux. whatever, i ramble on.

let me know if you need help setting this up, or help finding the info that the bot needs to function.
