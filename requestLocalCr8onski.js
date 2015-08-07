console.log('Howdy!');
var request = require('request');
request('file:///D:/creighta/documents/ang/html/', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body);	//show html for requested page
	} else {
		console.log('No Go! Bummer:(');
		console.log(response);
	}
})