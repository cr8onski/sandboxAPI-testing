console.log('Howdy!');
var request = require('request');
var fs = require('fs');
request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'));
// , function (error, response, body) {
	// if (!error && response.statusCode == 200) {
		// console.log(body);	//show html for requested page
	// } else {
		// console.log('No Go! Bummer:(');
		// console.log(response);
	// }
// })