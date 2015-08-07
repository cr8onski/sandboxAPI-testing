console.log('Howdy!');
var request = require('request');
var fs = require('fs');
request('http://cr8onski.github.io/html_demo.html').pipe(fs.createWriteStream('html_demo.html'));
// , function (error, response, body) {
	// if (!error && response.statusCode == 200) {
		// console.log(body);	//show html for requested page
	// } else {
		// console.log('No Go! Bummer:(');
		// console.log(response);
	// }
// })