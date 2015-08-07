console.log('Howdy!');
var request = require('request');
request('http://cr8onski.github.io/', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);	//show html for requested page
	} else {
		console.log('No Go! Bummer:(');
		console.log(response);
	}
})