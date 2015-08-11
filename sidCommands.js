console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');

var root = 'http://localhost:3000/sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';
var sid = '?SID=_adl_sandbox_L8BnGGj85ZHAmsy1_';

// setting up the command objects - these need SID's
var commands = [/*'apppath', 'cameras'/*, 'docdir', 'getassets',
				'getassetassetdata', 'getassetmetadata', 'globalassets',
				'profile', 'profiles', */'restorebackup'/*, 'salt', 'saspath'/*,
				'state', 'statedata', 'statehistory', 'states', 'stateslist',
				'textures', 'thumbnail', 'updatepassword'*/];

var options = {
	// url : "" + root + vwf,
	//headers : {
		// 'SID':'_adl_sandbox_L8BnGGj85ZHAmsy1_'	//the one state id there is right now
		// 'UID':'Postman'
	//}
};

//setting up the loop
var len = commands.length;
var i;
for (i = 0; i < len; i++) {
	(function (i) {
		options.url = "" + root + vwf + commands[i] + sid;
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
				console.log('error ' + commands[i]);
				console.log(error);
				console.log('error\n');
			})
			.pipe(fs.createWriteStream(commands[i] + '.txt'));
		console.log('\n');
	}) (i);
}

//we've made it to the end - nonasynchronously
console.log('Ciao, Bella!');
