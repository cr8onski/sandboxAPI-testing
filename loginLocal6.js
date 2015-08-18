//testing logging in on localhost:3000
console.log('Howdy!');//intro - we're working

//loading modules
var request = require('request');
var fs = require('fs');
//adding tough cookie to the mix - see if this helps
var tough = require('tough-cookie');
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

//additional functions for login
var EncryptPassword = function (password, username,salt)
{
	var CryptoJS = require('crypto-js');
	var unencrpytedpassword = password + username + salt;
	for (var i = 0; i < 1000; i++)
	{
		unencrpytedpassword = CryptoJS.SHA256(unencrpytedpassword) + '';
	}
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
var pw = "";
var stuff;

//get salt
request
	.get(root + sandbox + vwf + 'salt?UID=' + UID)
	.on('response', function(response) {
		console.log(response.statusCode);
		console.log(response.headers['content-type']);
	})
	.on('data', function(chunk) {
		// console.log(commands[i]);
		console.log(chunk.toString() + "\n");
		salt = chunk;
	})
	.on('error', function(error) {
		console.log('error ' + commands[i]);
		console.log(error);
		console.log('error = no salt try again\n');
	})

//let's assume we've got the salt at this point
//Encrypt the password
pw = EncryptPassword(pword, UID, salt);

//Create form-data
var formData = {
	username : UID,
	password : pw
};

//Here comes a change with the new tough-cookie required
	//make the Post
	// var cookies = {};
	// var cookie = "";
	// var loginJar = request.jar(); moved to inside of following request
var Cookie = tough.Cookie;
//just this one for now, others will be inside requests


request
	.post({url : root + localAuth, form : formData})
	.on('response', function(response) {
		console.log(response.statusCode);
		if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 200) {
			console.log('good');
			console.log(response.headers['content-type']);
			console.log(response.headers);
//Above it all good/nothing new
//Below is trying out some new tough-cookie stuff
			// var cookie = Cookie.parse(response.headers['set-cookie']);
			var cookies = response.headers['set-cookie'][1];

			// if (response.headers['set-cookie'] instanceof Array)
			// 	cookies = response.headers['set-cookie'].map(function (c) { return (Cookie.parse(c)); });
			// else
			// 	cookies = [Cookie.parse(response.headers['set-cookie'])];

			var loginJar = new tough.CookieJar();
			console.log(cookies);
			loginJar.setCookieSync(cookies, root);
			// cookie = response.headers['set-cookie'][1];

//old tries
			// cookies = request.cookie(cookie);
			// loginJar.setCookie(cookies);
			// loginJar.add(cookies);
			// loginJar.append('cookies');

			console.log("Compare:\n");
			// console.log("cookie : " + cookie + "to...\n");
			console.log("cookies: " + cookies + "to...\n");
			 console.log("jar    : " + loginJar.getCookiesSync(root, {}) + "\n");

			request({url : root + sandbox + vwf + 'logindata', jar : loginJar})
				.then(console.log("Inside logindata request: " + jar))
				.on('response', function(response) {
					console.log(response.statusCode);
					console.log(response.headers['content-type']);
				})
				.on('data', function(chunk) {
					console.log(chunk.toString() + "\n");
				})
				.on('error', function(err) {
					console.log('Bad news, Dude: ' + err + '\n');
				})
		} else {
			console.log('error: not okay nor redirect');
		}
	})
	.on('error', function(error) {
		console.log("Error Logging In: " + error + '\n');
	});

console.log('Happy day, you may be logged in.');

//we've made it to the end - nonasynchronously
console.log('Ciao, Bella!');
