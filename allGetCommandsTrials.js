console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');

var root = 'http://localhost:3000/sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';

// setting up the command objects - these need UID's
var commands = ['', '3drdownload', '3drmetatdata', '3drpermission', '3drsearch', '3drtexture', '3drthumbnail', 'apppath', 'cameras', 'copyinstance', 'datafile', 'docdir', 'forgotpassword', 'getanalytics.js', 'getassets', 'globalassetassetdata', 'globalassetmetadata', 'globalassets', 'inventory', 'inventoryitemassetdata', 'inventoryitemmetadata', 'library', 'login', 'logindata', 'logout', 'profile', 'profiles', /*'restorebackup',*/ 'salt', 'saspath', 'sitelogin', 'sitelogout', 'state',/* 'statedata',*/ 'statehistory', 'states', 'stateslist', 'texture', 'textures', 'texturethumbnail', 'thumbnail', 'updatepassword'];

var options = {};

//some math for later
// baseLen = options.url.length;
// console.log('the base url is ' + baseLen + ' characters long.');

//setting up the loop
var results = "";
var len = commands.length;
var i;

for (i = 0; i < len; i++) {
	(function (i) {
		options.url = "" + root + vwf + commands[i];

		request
			.get(options)
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
				console.log('error' + commands[i]);
				console.log(error);
				console.log('error\n');
			})
			.pipe(fs.createWriteStream(commands[i] + '.txt'));
	}) (i);
}

//we've made it to the end - nonasynchronously
//write reulsts to a file and leave
fs.writeFile('results.txt', results, function (err) {
	if (err) console.log('No Good: ' + err);
	else console.log('Results > results.txt');
})
console.log('Ciao, Bella!');
