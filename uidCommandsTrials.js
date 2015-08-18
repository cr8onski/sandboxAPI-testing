console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');

var root = 'http://localhost:3000/sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';

// setting up the command objects - these need UID's
var commands = ['apppath', 'docdir', 'profile', 'profiles', 'salt', 'saspath', 'states', 'textures', 'updatepassword'];

var options = {
	// url : "" + root + vwf,
	headers : {
		'UID':'Postman'
	}
};

//some math for later
// baseLen = options.url.length;
// console.log('the base url is ' + baseLen + ' characters long.');

//setting up the loop
var len = commands.length;
var i;
for (i = 0; i < len; i++) {
	(function (i) {
		// options.headers = {'UID':'Postman'};
		options.url = "" + root + vwf + commands[i];
		// options.url += commands[i];
		request
			.get(options)
			.on('response', function(response) {
				console.log(response.statusCode);
				console.log(response.headers['content-type']);
			})
			.on('data', function(chunk) {
				console.log(commands[i]);
				console.log(chunk.toString() + "\n");
			})
			.on('error', function(error) {
				console.log('error' + commands[i]);
				console.log(error);
				console.log('error\n');
			})
			.pipe(fs.createWriteStream(commands[i] + '.txt'));
		console.log('\n');
	}) (i);
}

//we've made it to the end - nonasynchronously
console.log('Ciao, Bella!');
