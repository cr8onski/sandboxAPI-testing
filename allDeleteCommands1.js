console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');

var root = 'http://localhost:3000/sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';

// setting up the command objects - these need UID's
var commands = ['',
	globalasset =  {
		id : 'globalasset',
		formData : {

		},
	},
	inventoryitem = {
		id : 'inventoryitem',
		formData : {

		},
	},
	profile = {
		id : 'profile',
		formData : {

		},
	},
	state = {
		id : 'state',
		formData : {

		},
	}
];

var options = {};
	// url : "" + root + vwf,
	// headers : {
		// 'UID':'Postman'
	// }
// };

//some math for later
// baseLen = options.url.length;
// console.log('the base url is ' + baseLen + ' characters long.');

//setting up the loop
var results = "";
var len = commands.length;
var i;

for (i = 0; i < len; i++) {
	(function (i) {
		options.uri = "" + root + vwf + commands[i].id;

		request
			.del(options)
			.on('response', function(response) {
				results += commands[i] + '\n' + response.statusCode + " " +
				 response.headers['content-type'] + '\n';
				console.log(response.statusCode);
				console.log(response.headers['content-type']);
				console.log(commands[i]);
			})
			.on('data', function(chunk) {
				results += chunk + '\n\n';
				console.log(chunk.toString() + "\n");
			})
			.on('error', function(error) {
				results += commands[i] + '\n' + error + '\n\n'
				console.log('error ' + commands[i]);
				console.log(error + '\n');
			})
			.pipe(fs.createWriteStream(commands[i] + '.txt'));
	}) (i);
}

//we've made it to the end - nonasynchronously
//write results to a file and leave
fs.writeFile('postResults.txt', results, function (err) {
	if (err) console.log('No Good: ' + err);
	else console.log('Results > postResults.txt');
})
console.log('Ciao, Bella!');
