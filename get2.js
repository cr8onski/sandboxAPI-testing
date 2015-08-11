console.log('Howdy!');
var request = require('request');
var fs = require('fs');

//commands is an object of three arrays: GET, POST, and DELETE
//those arrays contain objects of the API commands
//those objects contain fields: 
var commands = ['apppath', 'docdir', 'profiles', 'salt', 'saspath', 'states', 'textures'];

var root = 'http://localhost:3000/adl/sandbox/';
var vwf = '/vwfdatamanager.svc/';


var len = commands.length;
var i;
for (i = 0; i < len; i++) { (function (i) {
	request
		.get(root + vwf + commands[i])
		.on('response', function(response) {
			console.log(commands[i]);
			console.log(response.statusCode);
			console.log(response.headers['content-type']);
			
		})
		.on('error', function(error) {
			console.log('error');
			console.log(error);
			console.log('error');
		})
		.pipe(fs.createWriteStream('get'commands[i] + '.txt'));
	})(i);
}