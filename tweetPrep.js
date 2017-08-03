function prepTweet (tweet) {
	//declaring and assigning helper variables
	var str = tweet
	var amt = ''
	var desc = ''
	var isNum = false

	var numOfMonVals = 0

	var strArray = str.split(' ')

	function hasNumbers (n) {
		return !isNaN(n)
	}
	
	for (var i = 0; i<strArray.length; i++) { 
		//remove any whitespace around the element
		strArray[i].trim()
		//if the element does not begin with a $ or an @,
		//then add it to the description
		if (strArray[i].substring(0, 1) != '$') {
			if (strArray[i].substring(0, 1) != '@') {
				desc += strArray[i] + ' '
			}
		}
		//else if the element that starts with a $ or an @
		//is a number, then assign that value to amt.
		else {
			isNum = hasNumbers(strArray[i].substring(1))
			if (isNum) {
				if (numOfMonVals < 1) {
					amt = strArray[i]
					numOfMonVals++
				}
				else {
					//TOO MANY COOKS (monetary values as found by this algorithm ;))
					return null
				}
			}
			//if the element is not a number, then return null
			else {
				return null
			}
		}
	}
	if (numOfMonVals === 0) {
		return null
	}
	else {
		str = amt + ' --- ' + desc
		return str
	}
}

module.exports = prepTweet
