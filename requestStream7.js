console.log('Howdy!');
var request = require('request');
var fs = require('fs');

request
	.get('http://reqr.es/api/users?page=2')

	.on('response', function(response, body) {
		console.log(response.statusCode);
		console.log(response.headers['content-type']);
		// console.log(response.text);
	})
	.on('error', function(err) {
		console.log('No Go! Bummer:(');
		console.log(err);
	})
	.pipe(fs.createWriteStream('reqres.txt'));
