//testing logging in on localhost:3000

//loading modules
var request = require('request');
var fs = require('fs');

//intro - we're working
console.log('Howdy!');

//uri help
var root = 'http://localhost:3000/';
var sandbox = 'sandbox/adl/';
var vwf = 'vwfdatamanager.svc/';
var localAuth = 'auth/local/';
var sid = '?SID=_adl_sandbox_L8BnGGj85ZHAmsy1_';
var uid = 'Postman';
var pword = 'Postman123';
var salt = "";
var pw = "";

salt = requestSalt(uid);

postLogin(uid, pword, salt);

console.log('Happy day, you may be logged in.');

//we've made it to the end - nonasynchronously
console.log('Ciao, Bella!');


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
var EncryptPassword = function (password, username, salt)
{
	var CryptoJS = require('crypto-js');
	var unencrpytedpassword = password + username + salt;
	for (var i = 0; i < 1000; i++)
	{
		unencrpytedpassword = CryptoJS.SHA256(unencrpytedpassword) + '';
	}
	return unencrpytedpassword;
}


// var stuff;

//get salt
function requestSalt (un) {
	request
		.get(root + sandbox + vwf + 'salt?UID=' + uid)
		.on('response', function(response) {
			console.log(response.statusCode);
			console.log(response.headers['content-type']);
		})
		.on('data', function(chunk) {
			// console.log(commands[i]);
			console.log(chunk.toString() + "\n");
			return chunk;
		})
		.on('error', function(error) {
			console.log('error ' + commands[i]);
			console.log(error);
			console.log('error = no salt try again\n');
		})
}

//let's assume we've got the salt at this point
//Encrypt the password
//fill in form
function fillForm (username, password, salt) {
	pw = EncryptPassword(password, username, salt);

	//Create form-data
	var formData = {
		username : username,
		password : pw
	};
}

//make the Post
function postLogin() {
	fillForm(uid, pword, salt);
	request
		.post({url : root + localAuth, formData : formData})
		.form(formData)
		.on('response', function(response) {
			console.log(response.statusCode);
			if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 200) {
				console.log('good');
				console.log(response.headers['content-type']);
				console.log('login response: \n' + response.toString() + '\n');
			} else {
				console.log('error: not okay nor redirect');
			}
		})
		.on('data', function(chunk) {
			// stuff = chunk;
			dataCheck(chunk);
		})
		.on('error', function(error) {
			console.log('Whoa!! Error: ' + error + '\n');
		});
}
	//this is where they say - xhr.send(formData;)
	//I'm not folowing this
	//I think I already sent it, was that not the right thing to do?

//looks like it wasn't the right thing to do, so let's try:
// request.post({url : root + localAuth, formData: formData}, function(err, response, body) {
// 	if (err) {
// 		console.log("Error in login: " + error + "\n");
// 	} else {
// 		console.log('Server responded with: ' + body + "\n");
// 	}
// })

//test against getting logindata
function dataCheck(stuff) {
	console.log("Here's the stuff you've got:\n" + stuff);
	if (stuff) {
		request
			.get(root + sandbox + vwf + 'logindata')
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
		console.log("We regret to inform you - you've got no stuff");
	}
}
