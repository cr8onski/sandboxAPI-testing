//testing logging in on localhost:3000
console.log('Howdy!');//intro - we're working

//loading modules
// var request = require('request');
// var fs = require('fs');
var $ = require('jquery');

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

// additional functions for login
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

// $(document).ready(function()
// {
//
// 	ko.applyBindings(vwfPortalModel);
// });

function redirect()
{
	window.location = vwfPortalModel.returnVal;
}

//uri help
var root = 'http://localhost:3000/';
var sandbox = 'sandbox/adl/';
// var vwf = 'vwfdatamanager.svc/';
// var localAuth = 'auth/local/';
// var sid = '?SID=_adl_sandbox_L8BnGGj85ZHAmsy1_';
var uid = 'Postman';
var pword = 'Postman123';
// var salt = "";
// var pw = "";
// var stuff;

//get salt
// request
// 	.get(root + sandbox + vwf + 'salt?UID=' + UID)
// 	.on('response', function(response) {
// 		console.log(response.statusCode);
// 		console.log(response.headers['content-type']);
// 	})
// 	.on('data', function(chunk) {
// 		// console.log(commands[i]);
// 		console.log(chunk.toString() + "\n");
// 		salt = chunk;
// 	})
// 	.on('error', function(error) {
// 		console.log('error ' + commands[i]);
// 		console.log(error);
// 		console.log('error = no salt try again\n');
// 	})

//let's assume we've got the salt at this point
//Encrypt the password
// pw = EncryptPassword(pword, UID, salt);

//Create form-data
// var formData = {
// 	username : UID,
// 	password : pw
// };

//make the Post

// request
// 	.post({url : root + localAuth, formData : formData})
// 	.on('response', function(response) {
// 		console.log(response.statusCode);
// 		if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 200) {
// 			console.log('good');
// 			console.log(response.headers['content-type']);
// 		} else {
// 			console.log('error: not okay nor redirect');
// 		}
// 	})
// 	.on('data', function(chunk) {
// 		checkLoginData(chunk);
// 	})
// 	.on('error', function(error) {
// 		console.log('Whoa!! Error: ' + error + '\n');
//
// 	});
	//this is where they say - xhr.send(formData;)
	//I'm not following this
	//I think I already sent it, was that not the right thing to do?

console.log('Happy day, you may be logged in.');

//test against getting logindata
// function checkLoginData (stuff) {
// 	if (stuff) {
// 		console.log(stuff.toString());
// 		request
// 			.get(root + sandbox + vwf + 'logindata')
// 			.on('response', function(response) {
// 				console.log(response.statusCode);
// 				console.log(response.headers['content-type']);
// 			})
// 			.on('data', function(chunk) {
// 				console.log(chunk.toString() + "\n");
// 			})
// 			.on('error', function(err) {
// 				console.log('Bad news, Dude: ' + err + '\n');
// 			})
// 	} else {
// 		console.log("We regret to inform you - you've got no stuff");
// 	}
// }

//we've made it to the end - nonasynchronously
console.log('Ciao, Bella!');



// vwfPortalModel.handleLoginButton = function(o, e){
handleLoginButton = function(o, e){

	var username = $('#txtusername').val();
	var password = $('#txtpassword').val();

	var salt = $.ajax( root + sandbox + '/vwfDataManager.svc/salt?UID='+ username,{async:false}).responseText;

	password = EncryptPassword(password,username,$.trim(salt));

	var formData = new FormData();
	formData.append('username', username);
	formData.append('password', password);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "../../auth/local");
	xhr.addEventListener("load",function(xhr)
	{
		if(xhr.target.status === 301 || xhr.target.status === 302 || xhr.target.status === 200)
		{
			$('#txtusername').val('');
			$('#txtpassword').val('');
			redirect();
		}else
		{
			//$('#txtusername').val('');
			$('#txtpassword').val('');
			$('#txtpassword').focus();
			vwfPortalModel.errorText("Error: Please ensure your username and password are both correct");
		}

	});
	xhr.addEventListener("error",function()
	{
		//$('#txtusername').val('');
		$('#txtpassword').val('');
		$('#txtpassword').focus();

		vwfPortalModel.errorText("Error: Please ensure your username and password are both correct");
	},false);
	xhr.send(formData);
} (uid, pword);
// </script>
