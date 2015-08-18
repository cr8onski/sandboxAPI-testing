//testing logging in on localhost:3000
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

//The copy paste method, which we have gotten to work now (see 7)
// var cookie = "session=0J0cGjsvJVg5oLB3NUd_FQ.IKq8WmXUtiTekyN2k8GX3Y5ytpc3wJ96AVGIL1vTBvXnzj-U_o6-7cju6YY8qxj7lUnIH01tYunDsXkzGhrYROAYhUvNtFfwbFxQd5g5u92FhKZQCjAS8vsFi_2Ss998h4iDK0nUUgNQ7Dt1Kn_MBgxOm1U69RbUpPMMmVpqDeBbJuSJ1PFGmu7zz1F31uoT0j-zxlW8lowVRLXHdohqA4NyJBq95a_-A6RoTEVK1U1WvL3nlIHhDNXKd0cMOzZXhQvS-vgnqaYiymkNMyf7_eGFxgmo-6l5sOTQuzYYzn32ShEWwLfM4xcE0qTiOep9e4KogbOCDL885-AnVK7tv1uPdrJs_yMzNd3fWSDjGtBVtauSe7gkHfXt6SoqS9D6MpZTrE69FBdhe_0ZrjhtXQ.1439987804677.86400000.pCpPFuagaFuMt35zrX2lai1KJ0p4lPUTRtHHzuvkV6E"//; i18next=en-US"


//Our new fancy make the call and get the cookie then use the cookie to
//unlock all sorts of mysteries
//Setup the cookie and the reuqest to use jars
var cookie = "";
var request = request.defaults({jar: true});

//Make the login request in order to get the session cookie
request
	.post({url : root + localAuth, form : formData})
	.on('response', function(response) {
		console.log(response.statusCode);
		if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 200) {
			console.log('good');
			console.log(response.headers['content-type']);
			console.log(response.headers);
			// debugger;
			// var loginJar = request.jar();
			cookie = response.headers['set-cookie'][1];
			// cookies = request.cookie(cookie);
			// loginJar.setCookieSync(cookies, root);
			//
			// console.log("Compare:\n");
			console.log("cookie : " + cookie + "\n");
			// console.log("cookies: " + cookies + "to...\n");
			// console.log("jar    : " + loginJar.getCookiesSync(root) + "\n");
		} else {
			console.log('error logging in: not okay nor redirect');
		}
	});

var jar = request.jar();
jar.setCookie(cookie, root, function(){

	console.log("These are cool cookies:", jar.getCookies(root));

	request({url : root + sandbox + vwf + 'logindata', jar : jar})
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

	console.log('Happy day, you may be logged in.');

	//we've made it to the end - nonasynchronously
	console.log('Ciao, Bella!');

});
