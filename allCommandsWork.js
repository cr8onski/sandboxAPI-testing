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
	none = {
		//this command is a setup it is never going to produce a favorable response
		name : '',
		method : 'GET',
		url : root + sandbox + vwf,
	},
	none = {
		//this command is a setup it is never going to produce a favorable response
		name : '',
		method : 'POST',
		url : root + sandbox + vwf,
	},
	none = {
		//this command is a setup it is never going to produce a favorable response
		name : '',
		method : 'DELETE',
		url : root + sandbox + vwf,
	},
	drdownload = {
		//401
		name : '3drdownload',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + '3drdownload',
	},
/*	drmetadata = {
		//401 and the page
		name : '3drmetadata',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + '3drmetadata',
	},*/
	drpermission = {
		//401 ""
		name : '3drpermission',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + '3drpermission',
	},
	drsearch = {
		//comes back 200; however i give it nothing to search for and it comes back with nothing.  It would be nice to search for different files and find a few
		name : '3drsearch',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + '3drsearch',
	},
	drtexture = {
		//401
		name : '3drtexture',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + '3drtexture',
	},
	drupload = {
		//404 404 not found
		//and with uid and sid i'm getting 500
		//how did I get the 404??
		name : '3drupload',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + '3drupload',
	},
/*	apppath = {
		//this one works as is
		name : 'apppath',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'apppath',
	},*/
/*	cameras = {
		//works as is.  Would like to add a camera to double check
		// 200 [{"name":"Camera1","id":"SandboxCamera-vwf-N32196c51"}]
		name : 'cameras',
		method : 'GET',
		qs : {
			'UID' : UID,
			//this sid has a camera
			'SID' : "_adl_sandbox_E8acu9xeKsoaARn7_",
			// 'SID' : SID,
		},
		url : root + sandbox + vwf + 'cameras',
	},*/
/*	copyinstance = {
		//weird - 200 _adl_sandbox_jzfyZYS4Vwt9iXh3_ find out more about this instance
		//yep I seem to be creating instances left and right about 60+ worlds now
		name : 'copyinstance',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'copyinstance',
	},*/
	createprofile = {
		// 500 user Postman already exists
		// do I have to be logged out to do this
		//see also
		name : 'createprofile',
		method : 'POST',
		qs : {	'UID' : UID,
			'SID' : SID,},
		form : {
			Username : 'Remy',
			Email : 'remy@mail.com',
			password : 'beware333Squirrels',
			password2 : 'beware333Squirrels',
			dateofbirth : '01022015',
			sex : 'male',
			relationshipstatus: 'none',
			fullname : "Remy 'Dude' Creighton",
			location : 'Orlando FL',
			homepage : 'remy.com',
			employer : 'no need',
		},
		url : root + sandbox + vwf + 'createprofile',
	},
	createstate = {
		//404 404 not found
		name : 'createstate',
		method : 'POST',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'createstate',
	},
	datafile = {
		//404 file not found
		name : 'datafile',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'datafile',
	},
/*	docdir = {
		//works fine as is, find way to suppress or shorten
		name : 'docdir',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'docdir',
	},*/
	error = {
		//404 404 not found
		name : 'error',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + 'error',
	},
/*	forgotpassword = {
		//200
		//seems to be working just fine, logging in with the old password keeps the old one valid
		name : 'forgotpassword',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'forgotpassword',
	},*/
	getanalytics = {
		//200 //Analytics not found, find analytics
		name : 'getanalytics.js',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'getanalytics.js',
	},
/*	getassets = {
		//200 and array of assets
		name : 'getassets',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'getassets',
	},*/
	globalasset = {
		//404 404 not found
		// 200 e445fe78-0e58-4383-aba5-6fbe347cf118
		//don't know why I started getting the 200 response
		name : 'globalasset',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + 'globalasset',
	},
	globalasset = {
		//404 404 not found
		name : 'globalasset',
		method : 'DELETE',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + 'globalasset',
	},
	globalassetassetdata = {
		//500 no AID in query string
		name : 'globalassetassetdata',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'globalassetassetdata',
	},
	globalassetmetadata = {
		//500 no AID in query string
		name : 'globalassetmetadata',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'globalassetmetadata',
	},
/*	globalassets = {
		//200 [], find a way to add an asset to double check
		//got plenty now
		name : 'globalassets',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'globalassets',
	},*/
/*	inventory = {
		//200 [], find way to add to inventory and double check
		//working good now
		name : 'inventory',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'inventory',
	},*/
/*	inventoryitemP = {
		//200 9ab2d1de-20c3-4c2e-8548-f4e9dfd6960f
		// looks good to me
		name : 'inventoryitem',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + 'inventoryitem',
	},*/
	inventoryitemD = {
		//404 404 not found
		name : 'inventoryitem',
		method : 'DELETE',
		qs : {
			'UID' : UID,
			'SID' : SID,
			//let's try this - should only work once
			'AID' : '9ab2d1de-20c3-4c2e-8548-f4e9dfd6960f'
		},
		form : {},
		url : root + sandbox + vwf + 'inventoryitem',
	},
	inventoryitemassetdata = {
		//500 no AID in query string
		name : 'inventoryitemassetdata',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
			//your very own aid
			'AID' : '72011935-2aef-4f0c-a5dd-953bc89e6849'
		},
		url : root + sandbox + vwf + 'inventoryitemassetdata',
	},
	inventoryitemmetadataG = {
		//500 no AID in query string
		name : 'inventoryitemmetadata',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
			'AID' : '56b634e6-d22d-4510-8809-d5e12fc9abdd'
		},
		url : root + sandbox + vwf + 'inventoryitemmetadata',
	},
	inventoryitemmetadataP = {
		//500 no AID in query string
		name : 'inventoryitemmetadata',
		method : 'POST',
		qs : {	'UID' : UID,
			'SID' : SID,},
		form : {},
		url : root + sandbox + vwf + 'inventoryitemmetadata',
	},
	library = {
		//404 404 not found, find the library
		name : 'library',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'library',
	},
/*	login = {
		//200 no longer supported...
		//that's as good as it gets
		name : 'login',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'login',
	},*/
	logindata = {
		//200 {object...}
		//keep this active as a test againt good session
		name : 'logindata',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'logindata',
	},
/*	logout = {
		//200 Client was not Logged into undefined
		//looks like it takes a state id 'S' and a client id 'CID'
		//with a good sid for s it sends:
		//200 Client was not Logged into _adl_sandbox_L8BnGGj85ZHAmsy1_
		name : 'logout',
		method : 'GET',
		qs : {
			'S' : SID,
			'CID' : UID,
		},
		url : root + sandbox + vwf + 'logout',
	},*/
/*	profileG = {
		//200 {Object...}
		name : 'profile',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'profile',
	},*/
	profileP = {
		//200 {Object...}
		//need to have something to POST
		//also think about arranging to create, post, get, delete and show deleted from profiles in that order
		name : 'profile',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + 'profile',
	},
	profileD = {
		//200 {Object...}
		name : 'profile',
		method : 'DELETE',
		qs : {	'UID' : UID,
			'SID' : SID,},
		form : {},
		url : root + sandbox + vwf + 'profile',
	},
/*	profiles = {
		//200 [Array of profile names]
		name : 'profiles',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'profiles',
	},*/
	publish = {
		//404 404 not found
		name : 'publish',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,

		},
		url : root + sandbox + vwf + 'publish',
	},
	restorebackup = {
		//500 You must be the owner of a world you publish
		//find out more about this
		name : 'restorebackup',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'restorebackup',
	},
/*	salt = {
		//200 salt string
		name : 'salt',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'salt',
	},*/
/*	saspath = {
		//200
		//could look into getting something more back
		name : 'saspath',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'saspath',
	},*/
	sitelogin = {
		//401 Already Logged in - yay!!! Victory!!!
		//what does this really do?? is this still used??
		name : 'sitelogin',
		method : 'GET',
		qs : {
			'UID' : UID,
			'P' : '1164a4a2a16700439c1863872b3cf2176a41c38f49005c0183bf58e6f4d61c48',
		},
		url : root + sandbox + vwf + 'sitelogin',
	},
/*	sitelogout = {
		//200
		//would if be different is we could login to site
		//looks like there would be no difference in what we see
		//now after this command the sandbox console shows null for session instead of it's ususal info, so it looks like we do indeed logout
		name : 'sitelogout',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'sitelogout',
	},*/
/*	stateG = {
		//200 {"GetStateResult"...}
		name : 'state',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'state',
	},*/
	stateD = {
		//200 {"GetStateResult"...}
		name : 'state',
		method : 'DELETE',
		qs : {	'UID' : UID,
			'SID' : SID,},
		form : {},
		url : root + sandbox + vwf + 'state',
	},
/*	statedataG = {
		//it is our chief crasher when qs is empty
		//with uid only crashes
		//with sid only works great
		//with uid and sid works great
		//and valid session cookie of course
		name : 'statedata',
		method : 'GET',
		// qs : {	'UID' : UID,
		// 	'SID' : SID,},
		url : root + sandbox + vwf + 'statedata',
	},*/
/*	statedataG = {
		//works fine with uid and sid in qs
		//it is our chief crasher when qs is empty
		//with uid and sid works great
		name : 'statedata',
		method : 'GET',
		qs : {
			// 'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'statedata',
	},*/
	statedataP = {
		//401 Anonymous users cannot edit instances
		//
		name : 'statedata',
		method : 'POST',
		qs : {	'UID' : UID,
			'SID' : SID,},
		form : {},
		url : root + sandbox + vwf + 'statedata',
	},
/*	statehistory = {
		//200 {"children"...}
		//also quite huge
		name : 'statehistory',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'statehistory',
	},*/
	states = {
		//200 {"_adl_sandbox_..."...}
		//this one has gotten huge
		name : 'states',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'states',
	},
/*	stateslist = {
		//200 [{"file"...}]
		name : 'stateslist',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'stateslist',
	},*/
	texture = {
		//404 file not found
		//find some textures
		name : 'texture',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'texture',
	},
/*	textures = {
		//200 {"GetTextureResult"...}
		//find some textures to upload
		name : 'textures',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'textures',
	},*/
	texturethumbnail = {
		//404 file not found
		name : 'texturethumbnail',
		method : 'GET',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		url : root + sandbox + vwf + 'texturethumbnail',
	},
/*	thumbnailG = {
		//200 ?png - prints out the whole png
		//works fine need to find way to suppress printing whole file
		//printing to console produces a lot of beeps - a lot
		//and tie up the console until they are done
		name : 'thumbnail',
		method : 'GET',
		qs : {	'UID' : UID,
			'SID' : SID,},
		url : root + sandbox + vwf + 'thumbnail',
	},*/
	thumbnailP = {
		//200 ?png
		//find way to suppress
		name : 'thumbnail',
		method : 'POST',
		qs : {	'UID' : UID,
			'SID' : SID,},
		form : {},
		url : root + sandbox + vwf + 'thumbnail',
	},
	updatepassword = {
		//401 no login data saving profile
		//I get the above response, but i'm sure i've got the logindata
		//that is the response for no logindata
		//I think I should get the bad password response
		name : 'updatepassword',
		method : 'GET',
		qs : {
			'P' : '1164a4a2a16700439c1863872b3cf2176a41c38f49005c0183bf58e6f4d61c48'
		},
		url : root + sandbox + vwf + 'updatepassword',
	},
	uploadtemp = {
		//404 404 Not Found
		//is this uploading formData
		//and where/when does this happen??
		name : 'uploadtemp',
		method : 'POST',
		qs : {
			'UID' : UID,
			'SID' : SID,
		},
		form : {},
		url : root + sandbox + vwf + 'uploadtemp',
	},
];

//set up data variables (profiles, states, inventory, textures)
//don't know that these are helpful at all
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
// request({uri : setupUrl + "inventory/"}, function(err, resp, body) {
// 	if (err) return console.error(err);
// 	inventory = body;
// 	console.log(inventory);
// });
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
			console.log("These are cool cookies:", jar.getCookies(root) + '\n');
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

	var jar2 = request.jar();
	jar2.setCookie(cookie, root, function(){
		console.log("These are cool cookies:", jar2.getCookies(root) + '\n');
	});

	//setting up the loop
	var results = "Results from Testing SandboxAPI Endpoints on " + new Date().toISOString().replace('T', ' ').substr(0, 19) + '\nSession Cookie: ' + jar2.getCookies(root) + '\n\n';

	var report = "Report of Testing SandboxAPI Endpoints on " + new Date().toISOString().replace('T', ' ').substr(0, 19) + '.\nRequests which produce Server Errors or Crashes.\n\n';

	var filename = 'EndpointResults.txt';
	var fileReport = 'EndpointReport.txt';
	var len = commands.length;

	function doRequest(i) {
		if (i === len) {
			results += '\n\n' + jar2.getCookies(root) + 'Curiouser and curiouser\n';
			fs.writeFile(filename, results, console.log('For all results see file', filename));
			fs.writeFile(fileReport, report, console.log('For report of errors see file', fileReport));
			// console.log('finishing doRequest');
			return;
		}

		// var options = setOptions(i);

		request(commands[i], function (err, response, body) {

			var strOpt = JSON.stringify(commands[i]);
			results += "\n" + strOpt + '\n';
			console.log(strOpt);

			if (err) {
				console.log('Error:', err);
				results += err + '\n';
				report += "\n" + commands[i].name + '\n' + strOpt + '\n' + err + '\n';
			} else {
				console.log(commands[i].name, body);
				results += response.statusCode + " " + body + '\n';
				if (response.statusCode >= 500) {
					report += "\n" + commands[i].name + '\n' + strOpt + '\n' + response.statusCode + " " + body + '\n';
				}	//if

			}	//else

			doRequest(i+1);
		})	//request
	}	//doRequest function
console.log('Lake');
//produce a loop around this to vary the input data
//Andy's way - not quite working
	// var varyInputs = function (k) {
	// 	if (k === badData.length) {
	// 		return;
	// 	}
	//
	// 	doRequest(0);
	// 	console.log(badData[k], k++);
	// 	varyInputs(k)
	// }
	// varyInputs(0);
console.log('Winni');
//Tommy's way
	// function varyInputs() {
	// 	console.log('bonjorno');
	// 	while (bd = badData.shift()) {
			doRequest(0);
	// 		console.log(badData[0]);
	// 	}
	// }
	// varyInputs();
console.log('pesaukee');
}	//runEmAll

reqSalt();
// console.log('who loves synchrony');
