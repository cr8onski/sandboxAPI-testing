//testing logging in on localhost:3000
//logging in and testing all get commands
	//I want to test them empty (1 already does)
	//I want to test them empty and logged in
	//I want to test them uid and logged in
	//uid alone
	//stateid and
	//stateid and logged in
//wow there's a lot that I want to do
console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');
// require("request-debug")(request);

//https://sandbox.adlnet.gov/100/adl/sandbox/login - returns 200 login screen
//https://sandbox.adlnet.gov/100/adl/sandbox/vwfDataManager.svc/salt?UID=cr8onski - get the salt
//https://sandbox.adlnet.gov/100/auth/local - POST the username and password (encrypted) by form-data
//https://sandbox.adlnet.gov/login - the next command
//https://sandbox.adlnet.gov/100/login - the one after that

// I do have to get the salt for my user
	// make sure to get a 200, or our uid is bad
// then put them together and encrypt the password
// make the form-data
	// username
	// password
// post to auth/local
	// get a 200, 301, or 302
	// or the login is unsucessful
// double check against logindata

//EncryptPassword function for login
var EncryptPassword = function (password, username, salt) {
	var CryptoJS = require('crypto-js');
	var unencrpytedpassword = password + username + salt;
	for (var i = 0; i < 1000; i++)
	{
		unencrpytedpassword = CryptoJS.SHA256(unencrpytedpassword) + '';
	}
	// console.log('In Encrypt: ', password, username, salt, unencrpytedpassword);
	return unencrpytedpassword;
}

//uri help
var root = 'http://localhost:3000/';
var sandbox = 'sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';
var localAuth = 'auth/local/';
var sid = '?SID=_adl_sandbox_L8BnGGj85ZHAmsy1_';
var UID = 'Postman';
var pword = 'Postman123';
var salt = "";
var cookie;

//setting up the commands
var commands = [/*'', '3drdownload', '3drmetatdata', '3drpermission', '3drsearch', '3drtexture', '3drthumbnail', 'apppath', 'cameras', 'copyinstance', 'datafile', 'docdir', 'forgotpassword', 'getanalytics.js', 'getassets', 'globalassetassetdata', 'globalassetmetadata', 'globalassets', 'inventory', 'inventoryitemassetdata', 'inventoryitemmetadata', 'library', 'login',*/ 'logindata', 'logout', 'profile', 'profiles', /*'restorebackup',*//* 'salt', 'saspath', 'sitelogin', 'sitelogout', 'state',/* 'statedata',*//* 'statehistory', 'states', 'stateslist', 'texture', 'textures', 'texturethumbnail', 'thumbnail', 'updatepassword'*/];

//get salt - returns the salt
var reqSalt = function () {
	// console.log(root + sandbox + vwf + 'salt?UID=' + UID);
	request({url:root + sandbox + vwf + 'salt?UID=' + UID}, reqLogin);
}

//Our new fancy make the call and get the cookie then use the cookie to
//unlock all sorts of mysteries
var reqLogin = function (error, response, salt) {
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
			uri : root + localAuth,
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
	console.log('Error:    ' + error);
	console.log('Response: ', response.statusCode, response.headers['content-type']);
	console.log('Data:     ' + data);
	// console.log('Jar:     ' + jar);
	console.log('Cookie:     ' + cookie);

	var options = {};
	var jar2 = request.jar();
	jar2 = jar2.setCookie(cookie, root, function(){
		console.log("These are cool cookies:", jar2.getCookies(root) + '\n');
	});

	//setting up the loop
	var results = "";
	var len = commands.length;
	var i;

	for (i = 0; i < len; i++) {
		(function (i) {
			options.url = "" + root + sandbox + vwf + commands[i];
			// options.jar = jar2;
			// console.log('jar is ready to go:', options.jar.getCookies(root));
			request({url : options.url, jar : jar2})
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
}

reqSalt();
console.log('Happy day, you may be logged in in just a few minutes.');
//we've made it to the end - nonasynchronously
