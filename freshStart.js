/*
Testing the SandboxAPI Endpoints
*/

//Requires
var request = require('request'),
    fs = require('fs'),
    async = require('async');

//Other files
var of = require('./commandOptions.js');

//URI help
var root = of.root,
    sandbox = of.sandbox,
    vwf = of.vwf,
    auth = of.auth;
console.log('begin:', root, sandbox, vwf, auth);

//Options help
var UID = 'Postman',
    SID = 'nTnwFDCAq5zOKh0M';


//Commands and checks before logging in
var preLogin = function (cb) {
    console.log("preLogin");
    var preList = [of.profiles, of.logindata, of.states, of.createprofile, of.apppath, of.noneD];
    var str = "\npreLogin\n";
    async.series([
        function () {
            console.log('Inside async.series');
            for (var o in preList) {
                console.log('Inside for loop: ', preList[o].name);
                request(preList[o], function (err, resp, body) {
                    if (err) {
                        console.error('Error:', err);
                    } else {
                        //
                        console.log(preList[o].name, body.substr(0, 40));
                        str += preList[o].name + ' ' + body + '\n\n';
                        console.log('this is the end of the string\n', str.length);
                    }   //end else
                })  //end request
            }   //end for
            // cb(null, str + "nope\n")
        },  //end function
        // cb(null, str)   //this gets called before str is added to by the loop
    ]); //end async series
    // cb(null, str)   //this gets called before str is added to by the loop
    function  cb (err, results) {
        console.log('Results:', results);
        console.log('String', str);
        // cb(null, str);
    }

}   //end function preLogin

//Steps and procedure to login
var goLogin = function (cb) {
    console.log("goLogin");

    var k = of.login(UID, P, function (err, results) {
        if (err) console.error('Error:', err);
        else {
            console.log('We are logged in.');
        }
    });

    // cb(null, "\ngoLogin\n" + JSON.stringify(of.profiles) + '\n');
    cb(null, "\ngoLogin\n");
}

//All commands while logged in
var withLogin = function (cb) {
    console.log("withLogin");
    // cb(null, "\nwithLogin\n" + JSON.stringify(of.thumbnailG) + '\n');
    cb(null, "\nwithLogin\n");
}

//Commands and checks after logging in
var postLogin = function (cb) {
    console.log("postLogin");
    cb(null, "\npostLogin\n");
    // cb("I made a miscalculation", "postLogin");
}

async.series([
    preLogin,
    // console.log('who knew'),
    goLogin,
    withLogin,
    postLogin,
    ],
    function (err, results) {
        // var outStr = "The new improved SandboxAPI Endpoints Results\nrun on ";
        // outStr += new Date().toISOString().replace('T', ' ').substr(0, 19) + '\n';
		// for (var b in results) {
		// 	if (results.hasOwnProperty(b)) {
		// 		outStr += results[b]
		// 	}
		// }
		// if (err) {
		// 	console.error('Error:', err);
		// } else {
		// 	fs.writeFile('freshStart.txt', outStr);
        //     console.log('end of outstr:', outstr.substr(0, 40));
		// }
        // console.log(of, 'OOPS', of.root, of.profiles);
		console.log('goodbye, So it is true, this code never gets covered.');
	}
);
console.log('This is not the end.');
