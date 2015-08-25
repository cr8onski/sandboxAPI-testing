/* This is the ambitious idea to run all commands from one file and run them
   with various data to test the SandboxAPI endpoints and find what crashes
   and excepts, so that we can make them work.

   file: Sandbox/support/server/sandboxAPI.js
   That is the file we are testing against.  To test against it we use an array
   of command objects which include name, array of methods, array of keys, and array of values.

   An array of data (empty string, garbage string ...) to try and break the API.
   Cookie to hold the valid session cookie (we could try making up garbage here)
   Could also use variables to hold valid profile names, states, and such.

   Run all kinds of scenarios - come back to this
*/

console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');

//URI help
var root = 'http://localhost:3000/';
var sandbox = 'sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';
var auth = 'auth/local/';
//Command help
var sid = '?SID=_adl_sandbox_L8BnGGj85ZHAmsy1_';
var UID = 'Postman';
var pword = 'Postman123';
var salt = "";
var cookie = "";
var AID;

//array of strings to be used in trying to break the api
var badData = [
	,	//undefined	0
	'',	//empty string	1
	'abc123',	//	2
	'*^%#@',	//please don't swear	3
	'>}<:>)P{?>^%}',	//random other symbols	4
	'\t\n\'',	//escape sequences	5
	'&#2045&#x2045',	//weird characters	6
	'whats\x45\x99\xa3\x0athis',	//weirder characters	7
	'Rob is great',	//propaganda	8
	'Andy is better', 	//better propaganda	9
	'_willthiswork',	//underscore start	10
	'Mick "the Mick" Muzac',	//double quotes	11
	"Steven 'the Steve' Vergenz",	//single quotes	12
]

// setting up the command objects
var commands = [
	none = {
		name : '',
		methods : ['GET', 'POST', 'DELETE'],
	},
	drdownload = {
		name : '3drdownload',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drmetadata = {
		name : '3drmetadata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drpermission = {
		name : '3drpermission',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drsearch = {
		name : '3drsearch',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drtexture = {
		name : '3drtexture',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drupload = {
		name : '3drupload',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	apppath = {
		name : 'apppath',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	cameras = {
		name : 'cameras',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	copyinstance = {
		name : 'copyinstance',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	createprofile = {
		name : 'createprofile',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	createstate = {
		name : 'createstate',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	datafile = {
		name : 'datafile',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	docdir = {
		name : 'docdir',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	error = {
		name : 'error',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	forgotpassword = {
		name : 'forgotpassword',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	getanalytics = {
		name : 'getanalytics.js',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	getassets = {
		name : 'getassets',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	globalasset = {
		name : 'globalasset',
		methods : ['POST', 'DELETE'],
		keys : [],
		vals : [],
	},
	globalassetassetdata = {
		name : 'globalassetassetdata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	globalassetmetadata = {
		name : 'globalassetmetadata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	globalassets = {
		name : 'globalassets',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	inventory = {
		name : 'inventory',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	inventoryitem = {
		name : 'inventoryitem',
		methods : ['POST', 'DELETE'],
		keys : [],
		vals : [],
	},
	inventoryitemassetdata = {
		name : 'inventoryitemassetdata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	inventoryitemmetadata = {
		name : 'inventoryitemmetadata',
		methods : ['GET', 'POST'],
		keys : [],
		vals : [],
	},
	library = {
		name : 'library',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	login = {
		name : 'login',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	logindata = {
		name : 'logindata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	logout = {
		name : 'logout',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	profile = {
		name : 'profile',
		methods : ['GET', 'POST', 'DELETE'],
		keys : [],
		vals : [],
	},
	profiles = {
		name : 'profiles',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	publish = {
		name : 'publish',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	restorebackup = {
		name : 'restorebackup',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	salt = {
		name : 'salt',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	saspath = {
		name : 'saspath',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	sitelogin = {
		name : 'sitelogout',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	state = {
		name : 'state',
		methods : ['GET', 'DELETE'],
		keys : [],
		vals : [],
	},
/*	statedata = {
		name : 'statedata',
		methods : ['GET', 'POST'],
		keys : [],
		vals : [],
	},
*/
	statehistory = {
		name : 'statehistory',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	states = {
		name : 'states',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	stateslist = {
		name : 'stateslist',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	texture = {
		name : 'texture',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	textures = {
		name : 'textures',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	texturethumbnail = {
		name : 'texturethumbnail',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	thumbnail = {
		name : 'thumbnail',
		methods : ['GET', 'POST'],
		keys : [],
		vals : [],
	},
	updatepassword = {
		name : 'updatepassword',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	uploadtemp = {
		name : 'uploadtemp',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
];

//EncryptPassword function for login
var EncryptPassword = function (password, username, salt) {
	console.log('In EncryptPassword');
	var CryptoJS = require('crypto-js');
	var unencrpytedpassword = password + username + salt;
	for (var i = 0; i < 1000; i++)
	{
		unencrpytedpassword = CryptoJS.SHA256(unencrpytedpassword) + '';
	}
	// console.log('In Encrypt: ', password, username, salt, unencrpytedpassword);
	return unencrpytedpassword;
}

//get salt - returns the salt
var reqSalt = function () {
	console.log('In reqSalt');
	request({url:root + sandbox + vwf + 'salt?UID=' + UID}, reqLogin);
}

//Our new fancy make the call and get the cookie then use the cookie to
//unlock all sorts of mysteries
var reqLogin = function (error, response, salt) {
	console.log('In reqLogin');
	if (!error && (response.statusCode === 200)) {
		var pw = EncryptPassword(pword, UID, salt.trim());
		// console.log("Here's what went into the pw: " + pword + UID + salt);
		// console.log('Is this the right password: ' + pw);
		//Create form-data
		var formData = {
			username : UID,
			password : pw
		};
		// var cookie = "";
		request = request.defaults({jar: true});
		var options = {
			uri : root + auth,
			form : formData,
			method : 'POST',
		}
		// console.log('The salt is: ' + salt);
		// console.log('with response code: ' + response.statusCode);
		request(options, reqLoginData);
	} else {
		console.log('The salt has lost its taste.' + error);
	}
}

	//Make the login request in order to get the session cookie
var reqLoginData = function (err, response, data) {
	console.log('In reqLoginData');
	console.log(response.statusCode);
	if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 200) {
		console.log('good');
		console.log(response.headers['content-type']);
		cookie = response.headers['set-cookie'][1].split(';')[0].trim();
		// var cookie = response.headers['set-cookie'][1].split(';')[0].trim();
		// console.log("cookie : " + cookie + "\n");
		var jar = request.jar();
		jar.setCookie(cookie, root, function(){
			// console.log("These are cool cookies:", jar.getCookies(root) + '\n');
			request({url : root + sandbox + vwf + 'logindata', jar : jar}, runEmAll)
				.on('response', function(response) {
					console.log(response.statusCode);
					console.log(response.headers['content-type']);
				})
				.on('data', function(chunk) {
					console.log(chunk.toString() + "\n");
				})
				.on('error', function(err) {
					console.log('Bad news, Dude: ' + err + '\n');
				});
		});
	} else {
		console.log('error logging in: not okay nor redirect' + err);
	}
}

var runEmAll = function (error, response, data) {

	console.log('In runEmAll');

	var options = {
		qs : {
			UID : 'Postman',
		}
	};
	var jar2 = request.jar();
	jar2 = jar2.setCookie(cookie, root, function(){
		console.log("These are cool cookies:", jar2.getCookies(root) + '\n');
	});

	//setting up the loop
	var results = "Results from Testing SandboxAPI Endpoints on " + new Date().toISOString().replace('T', ' ').substr(0, 19) + '\n';
	var report = "Report of Testing SandboxAPI Endpoints on " + new Date().toISOString().replace('T', ' ').substr(0, 19) + '.\nRequests which produce Server Errors or Crashes.\n';
	var filename = 'EndpointResults.txt';
	var fileReport = 'EndpointReport.txt';
	var len = commands.length;

	function doRequest(i) {
		if (i === len) {
			fs.writeFile(filename, results, console.log('For all results see file', filename));
			fs.writeFile(fileReport, report, console.log('For report of errors see file', fileReport));
			return;
		}

		options.url = "" + root + sandbox + vwf + commands[i].name;
		request({url : options.url, jar : jar2}, function (err, response, body) {
			results += "\n" + commands[i].name + '\n';

			if (err) {
				console.log('Error:', err);
				results += err + '\n';
				report += "\n" + commands[i].name + '\n' + err + '\n';
			} else {
				console.log(commands[i].name, body);
				results += response.statusCode + " " + body + '\n';
				if (response.statusCode >= 500) {
					report += "\n" + commands[i].name + '\n' + response.statusCode + " " + body + '\n';
				}

			}
			doRequest(i+1);
		})
	} doRequest(0);
}

reqSalt();
console.log('who loves synchrony');
