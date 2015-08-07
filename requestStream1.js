console.log('Howdy!');
var request = require('request');
var fs = require('fs');
request('http://sandboxdocs.readthe docs.org/en/latest/Developer%20Guide/SandboxAPI.md').pipe(fs.createWriteStream('SandboxAPItest.md'));
// , function (error, response, body) {
	// if (!error && response.statusCode == 200) {
		// console.log(body);	//show html for requested page
	// } else {
		// console.log('No Go! Bummer:(');
		// console.log(response);
	// }
// })