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

var cookie = "session=P3J0T1Bczgs1zvo78j1ZoA.YJJhMTA-pTfyARRnWUDGFtTw2hFxOaoVolAtsh2_rQR1D88iHHrVDIyDjed6l-QvCYL3nR1UPXCGIdz5m5Zd0r3ExEz-EGecRsJCF-CAmdOGmdXjzHft4K3VOHTvcTnl-atspKvaNbwvYriXxPu5L2vhj-KrW3cvBWwwP5TsRe_TUWtUngAj--9mhYJ3oHR9I91SiPxZKiUU5_HyMYJUDNUk8kYyYGTa_59Vwp_2T2w4nS1nCCZitp47k2qarvTWT95OeiJ458jEDhcWqqz2TTZsgROvbM1qus5mAksOR9ojOqZXlelb1q7qDFStKQbsvqgfRcy552t7qNjF4MT8aPI0JY9hoCRr8m32CCqQKHuFqdVFg1uDkp0o6l2gzN3IJIA5fu8VpDDCS93hya-9HA.1439934870142.86400000.dhKcVyO_2GciwTkeo0GGldYDUbNg8CLy7yNOXiT6wrM; i18next=en-US";

// var loginJar = request.jar();
var request = request.defaults({jar: true});

var jar = request.jar();
jar.setCookie(cookie, root, function(){

	console.log("These are cool cookies:", jar.getCookies(root));

	request({url : root + sandbox + vwf + 'logindata'/*, jar : loginJar*/})
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
