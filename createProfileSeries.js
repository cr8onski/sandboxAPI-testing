/*
The createprofile command works only when not logged in (by the way, being
logged in catches with: 500 user Postman already exists). This is to run it separately without the login data that is required for so many commands, and test against a variety of data.
*/
console.log('howdy');
//loading modules
var request = require('request');
var fs = require('fs');
var async = require('async');

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

var command = {
    //will have to delete users, or come up with new user names to
    //continue testing
    //200
    // 500 user Postman already exists
    // do I have to be logged out to do this - yes
    //see also createprofile.txt
    //must have a nonempty UID in qs
    name : 'createprofile',
    method : 'POST',
    qs : {	'UID' : 'Bumble',
        'SID' : SID,},
    form : {
        // Username : 'Remy',
        Username : 'Bumble',
        Email : 'remy@mail.com',
        Password : 'beware456Squirrels',
        Password2 : 'beware456Squirrels',
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
    profiles = {
        name : 'profiles',
        method : 'GET',
        url : root + sandbox + vwf + 'profiles',
    },
	profile = {
		name : 'profile',
		method : 'GET',
		url : root + sandbox + vwf + 'profile',
		qs : {
			UID : 'Bumble',
		}
	};

console.log('start');
var outStr = "";
async.series([
    startingProfiles,
    createProfile,
    checkProfiles,
    userProfile,
	delProfile,
	checkProfiles,
    ],
    function(err, results) {
        for (var b in results) {
            if (results.hasOwnProperty(b)) {
                outStr += results[b]
            }
        }
		if (err) {
			console.error('Error:', err);
		} else {
        	fs.writeFile('createprofile.txt', outStr);
		}
		console.log('goodbye');
    }
);
//placed into function for async.series
function startingProfiles(cb) {
    console.log('startingProfiles');
    console.log(JSON.stringify(profiles, null, 4));
    request(profiles, function (err, resp, body) {
        if (err) {
            // outStr += err;
            console.error('Error:', err);
            // createProfile();
        } else {
			console.log('are we here when we get hung up??');
            // outStr += 'Profiles before: ' + body + '\n\n';
            var str = 'Profiles before: ' + body + '\n\n';
            // createProfile();
        }
        cb(err, str);
    });
	console.log("i don't think this should ever execute");
}

function createProfile (cb) {
    console.log('createProfile');
    request(command, function (err, resp, body) {
        if (err) {
            // outStr += err;
            console.error('Error:', err);
            // checkProfiles();
        } else {
            var pickle = resp.statusCode + ' ' + resp.headers['content-type'] + '\n' + body + '\n';

            console.log(resp.statusCode, resp.headers['content-type'], body);   //why am i getting a visible \n here
            // checkProfiles();
        }
        cb(err, pickle);
    })
}

function checkProfiles (cb) {
    console.log('checkProfiles');
    request(profiles, function (err, resp, body) {
        if (err) {
            // outStr += err;
            console.error('Error:', err);
        } else {
            // outStr += '\nProfiles after: ' + body + '\n\n';
            var something = '\nProfiles after: ' + body + '\n\n';
            console.log(body);
        }
        cb(err, something);
    })
}

function userProfile(cb) {
    console.log('userProfile');
    request(profile, function (err, resp, body) {
        if (err) {
            // outStr += err;
            console.error('Error:', err);
        } else {
            var blip = '\n' + body + '\n\n';
            console.log(body);
        }
        cb(err, blip);
    })
}
//need to be logged in to delete a profile, not ready to do this now
// function delProfile(cb) {
// 	//need to be logged in to delete a profile
// 	//lots of 200's but no deletions yet
// 	console.log('delProfile');
// 	var profileD = {
// 		//200 {Object...}
// 		name : 'profile',
// 		method : 'DELETE',
// 		qs : {
// 			'UID' : 'Bumble',
// 			'SID' : SID,
// 		},
// 		form : {},
// 		url : root + sandbox + vwf + 'profile',
// 	};
//
// 	request(profileD, function (err, resp, body) {
// 		if (err) {
// 			console.error('Error:', err);
// 		} else {
// 			var temp = '\n' + JSON.stringify(profileD, null, 4) + '\n' + body + '\n\n';
// 			console.log(body);
// 		}
// 		cb(err, temp);
// 	})
//
// }
