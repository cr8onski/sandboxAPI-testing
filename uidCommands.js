console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');

// setting up the command objects - these need UID's
var commands = ['apppath', 'docdir', 'profiles', 'salt', 'saspath', 'states', 'textures', 'updatepassword'];

var options = {

}

//setting up the loop
var len = commands.length;
var i;
for (i = 0; i < len; i++) {
	(function (i) {
		request
			.get('http://localhost:3000/adl/sandbox/vwfdatamanager.svc/' + commands[i])
			.on('response', function(response) {
				console.log(response.statusCode);
				console.log(response.headers['content-type']);
			})
			.on('data', function(chunk) {
				console.log(commands[i]);
				console.log(chunk.toString());
			})
			.on('error', function(error) {
				console.log('error' + commands[i]);
				console.log(error);
				console.log('error');
			})
			.pipe(fs.createWriteStream(commands[i] + '.txt'));
	}) (i);
}

//we've made it to the end - nonasynchronously
console.log('Ciao, Bella!');
