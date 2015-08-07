console.log('Howdy!');
var request = require('request');
request('http://reqr.es/api/users?page=2', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);	//show html for requested page
	} else {
		console.log('No Go! Bummer:(');
		console.log(response);
	}
})