console.log('Howdy!');
var request = require('request');
var fs = require('fs');

var commands = ['apppath', 'docdir', 'profiles', 'salt', 'saspath', 'states', 'textures'];
var len = commands.length;
var i;
for (i = 0; i < len; i++) {
	request
		.get('http://localhost:3000/adl/sandbox/vwfdatamanager.svc/' + commands[i])
		.on('response', function(response, body) {
			console.log(response.statusCode);
			console.log(response.headers['content-type']);
			// console.log(response);
		})
		.on('error', function(error) {
			console.log('error');
			console.log(error);
			console.log('error');
		})
		.pipe(fs.createWriteStream(commands[i] + '.txt'));
}