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

// console.log('Howdy!');//intro - we're working

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
var SID = '_adl_sandbox_L8BnGGj85ZHAmsy1_';
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

//setting up the command objects
var commands = [
/*	none = {
		//this command is a setup it is never going to produce a favorable response
		name : '',
		methods : ['GET', 'POST', 'DELETE'],
	},
	drdownload = {
		//401
		name : '3drdownload',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drmetadata = {
		//401 and the page
		name : '3drmetadata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drpermission = {
		//401 ""
		name : '3drpermission',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drsearch = {
		//comes back 200; however i give it nothing to search for and it comes back with nothing.  It would be nice to search for different files and find a few
		name : '3drsearch',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drtexture = {
		//401
		name : '3drtexture',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	drupload = {
		//404 404 not found
		name : '3drupload',
		methods : ['POST'],
		keys : [],
		vals : [],
	},/*
	apppath = {
		//this one works as is
		name : 'apppath',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	cameras = {
		//works as is.  Would like to add a camera to double check
		name : 'cameras',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	copyinstance = {
		//weird - 200 _adl_sandbox_jzfyZYS4Vwt9iXh3_ find out more about this instance
		name : 'copyinstance',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	createprofile = {
		//404 404 not found
		name : 'createprofile',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	createstate = {
		//404 404 not found
		name : 'createstate',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	datafile = {
		//404 file not found
		name : 'datafile',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	docdir = {
		//works fine as is, find way to suppress or shorten
		name : 'docdir',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*/
	error = {
		//404 404 not found
		name : 'error',
		methods : ['POST'],
		keys : [],
		vals : [],
	},/*
	forgotpassword = {
		//200
		name : 'forgotpassword',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*/
	getanalytics = {
		//200 //Analytics not found, find analytics
		name : 'getanalytics.js',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	getassets = {
		//200 and array of assets
		name : 'getassets',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	globalasset = {
		//404 404 not found
		name : 'globalasset',
		methods : ['POST', 'DELETE'],
		keys : [],
		vals : [],
	},
	globalassetassetdata = {
		//500 no AID in query string
		name : 'globalassetassetdata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	globalassetmetadata = {
		//500 no AID in query string
		name : 'globalassetmetadata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	globalassets = {
		//200 [], find a way to add an asset to double check
		name : 'globalassets',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	inventory = {
		//200 [], find way to add to inventory and double check
		name : 'inventory',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	inventoryitem = {
		//404 404 not found
		name : 'inventoryitem',
		methods : ['POST', 'DELETE'],
		keys : [],
		vals : [],
	},
	inventoryitemassetdata = {
		//500 no AID in query string
		name : 'inventoryitemassetdata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	inventoryitemmetadata = {
		//500 no AID in query string
		name : 'inventoryitemmetadata',
		methods : ['GET', 'POST'],
		keys : [],
		vals : [],
	},
	library = {
		//404 404 not found, find the library
		name : 'library',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	login = {
		//200 no longer supported...
		//that's as good as it gets
		name : 'login',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	logindata = {
		//200 {object...}
		name : 'logindata',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*/
	logout = {
		//200 Client was not Logged into undefined
		//looks like it takes a state id 'S' and a client id 'CID'
		//and logs out any clients and I don't know what
		//still not it
		name : 'logout',
		methods : ['GET'],
		keys : ['S', 'CID'],
		vals : [SID, UID],
	},/*
	profile = {
		//200 {Object...}
		name : 'profile',
		methods : ['GET', 'POST', 'DELETE'],
		keys : [],
		vals : [],
	},*//*
	profiles = {
		//200 [Array of profile names]
		name : 'profiles',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	publish = {
		//404 404 not found
		name : 'publish',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
	restorebackup = {
		//500 You must be the owner of a world you publish
		//find out more about this
		name : 'restorebackup',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	salt = {
		//200 salt string
		name : 'salt',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	saspath = {
		//200
		//could look into getting something more back
		name : 'saspath',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*/
	sitelogin = {
		//401 Login Format incorrect
		//what does this really do?? is this still used??
		//UID and P (password) pver the qs
		//even with the hardcode I got nowhere
		name : 'sitelogin',
		methods : ['GET'],
		keys : ['UID', 'P'],
		vals : [UID, "1164a4a2a16700439c1863872b3cf2176a41c38f49005c0183bf58e6f4d61c48"],
	},
	sitelogout = {
		//200
		//would if be different is we could login to site
		//looks like there would be no difference in what we see
		name : 'sitelogout',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	state = {
		//200 {"GetStateResult"...}
		name : 'state',
		methods : ['GET', 'DELETE'],
		keys : [],
		vals : [],
	},*//*
	statedata = {
		//find what can make this one work
		//it is our chief crasher
		name : 'statedata',
		methods : ['GET', 'POST'],
		keys : [],
		vals : [],
	},*//*
	statehistory = {
		//200 {"children"...}
		name : 'statehistory',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	states = {
		//200 {"_adl_sandbox_..."...}
		name : 'states',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*//*
	stateslist = {
		//200 [{"file"...}]
		name : 'stateslist',
		methods : ['GET'],
		keys : [],
		vals : [],
	},*/
	texture = {
		//404 file not found
		//find some textures
		name : 'texture',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	textures = {
		//200 {"GetTextureResult"...}
		//find some textures to upload
		name : 'textures',
		methods : ['GET'],
		keys : [],
		vals : [],
	},
	texturethumbnail = {
		//404 file not found
		name : 'texturethumbnail',
		methods : ['GET'],
		keys : [],
		vals : [],
	},/*
	thumbnail = {
		//200 ?png
		//find way to suppress
		name : 'thumbnail',
		methods : ['GET', 'POST'],
		keys : [],
		vals : [],
	},*/
	updatepassword = {
		//401 no login data saving profile
		//I get the above response, but i'm sure i've got the logindata
		//that is the response for no logindata
		//I think I should get the bad password response
		name : 'updatepassword',
		methods : ['GET'],
		keys : ['P'],
		vals : ["1164a4a2a16700439c1863872b3cf2176a41c38f49005c0183bf58e6f4d61c48"],
	},
	uploadtemp = {
		//404 404 Not Found
		//is this uploading formData
		//and where/when does this happen??
		name : 'uploadtemp',
		methods : ['POST'],
		keys : [],
		vals : [],
	},
];

//set up data variables (profiles, states, inventory, textures)
setupUrl = root + sandbox + vwf;
var profiles, states, inventory, textures;
request({uri : setupUrl + "profiles/"}, function(err, resp, body) {
	if (err) return console.error(err);
	profiles = body;
	console.log(profiles);
});
// request({uri : setupUrl + "states/"}, function(err, resp, body) {
// 	if (err) return console.error(err);
// 	states = body;
// 	console.log(states);
// });
request({uri : setupUrl + "inventory/"}, function(err, resp, body) {
	if (err) return console.error(err);
	inventory = body;
	console.log(inventory);
});
request({uri : setupUrl + "textures/"}, function(err, resp, body) {
	if (err) return console.error(err);
	textures = body;
	console.log(textures);
});


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

// see about making commands into options
// make a duplicate option for each method
var setOptions = function (index) {
	var i = index;
	command = commands[i];
	console.log(command);
	var opts = {
		qs : {
			UID : 'Postman',
			SID : '_adl_sandbox_L8BnGGj85ZHAmsy1_',
		},
		url : "" + root + sandbox + vwf + commands[i].name,
		useQuerystring : true,
		method : command.methods[0],
	};
	if (command.keys) {
		var len = command.keys.length;
		for (var j = 0; j < len; j++) {
			opts.qs[command.keys[j]] = opts.qs[command.vals[j]];
		}
	}

	return opts;
}

//Take an Object and builds a string of that Object to return
// Try JSON.stringify(obj, null, 4);
var strObj = function(obj) {
	var str = "";
	for (var f in obj) {
		// if (f !== null && typeof f === 'object') {
		// if (typeof f === 'object') {
		if (f && typeof f === 'object') {
			str += strObj(f);
		} else if (obj.hasOwnProperty(f)) {
			str += f + " : " + obj[f] + "; ";
		}
	}
	return str;
}

var runEmAll = function (error, response, data) {

	// console.log('In runEmAll');

	var jar2 = request.jar();
	jar2 = jar2.setCookie(cookie, root, function(){
		console.log("These are cool cookies:", jar2.getCookies(root) + '\n');
	});

	// var options = {
	// 	qs : {
	// 		UID : 'Postman',
	// 		SID : '_adl_sandbox_L8BnGGj85ZHAmsy1_',
	// 	}
		// jar : request.jar(),
	// };
	// options.jar = options.jar.setCookie(cookie, root, function(){
	// 	console.log('these are cool cookies:', options.jar.getCookies(root) + '\n');
	// })

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
			// console.log('finishing doRequest');
			return;
		}

		var options = setOptions(i);

		request(options, function (err, response, body) {

			var strOpt = strObj(options);


			// options.toString();
			results += "\n" + commands[i].name + '\n' + strOpt + '\n';
			console.log('right here', options, strOpt);
			if (err) {
				console.log('Error:', err);
				results += err + '\n';
				report += "\n" + commands[i].name + '\n' + options.valueOf() + '\n' + err + '\n';
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
// console.log('who loves synchrony');
