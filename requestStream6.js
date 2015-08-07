console.log('Howdy!');
var request = require('request');
var fs = require('fs');
request
	.get('http://reqr.es/api/users?page=2')
	.on('response', function(response) {
		console.log(response.statusCode);
		console.log(response.headers['content-type']);
	})
	.pipe(fs.createWriteStream('reqres.txt'));
// , function (error, response, body) {
	// if (!error && response.statusCode == 200) {
		// console.log(body);	//show html for requested page
	// } else {
		// console.log('No Go! Bummer:(');
		// console.log(response);
	// }
// })