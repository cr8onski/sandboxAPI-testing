/*
It is about time somebody cleaned up around here!
*/

var request = require('request');
var fs = require('fs');
var async = require('async');
//Other files
var of = require('./commandOptions.js');

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


var states = of.states;
// {
// 	//200 {"_adl_sandbox_..."...}
// 	//this one has gotten huge
// 	name : 'states',
// 	method : 'GET',
// 	qs : {	'UID' : UID,
// 		'SID' : SID,},
// 	url : root + sandbox + vwf + 'states',
// }

var statesList;
var len;

var stateD = {
	//200 deleted instance
	//cannot reuse the same SID all the time - go fig
	name : 'state',
	method : 'DELETE',
	qs : {
		'UID' : UID,
		// 'SID' : SID,	//500 instance does not exist
		'SID' : "_adl_sandbox_MH26teZnwu9BBISj_",	//200 deleted instance
	},
	form : {},
	url : root + sandbox + vwf + 'state',
}

var getList = function (cb) {

    request (states, function (err, resp, body) {
        if (err) cb(err, null);
        statesList = Object.keys(JSON.parse(body));
        len  = statesList.length;
        console.log(statesList, statesList.length, typeof statesList);
        fs.appendFile('manyStates.txt', statesList.length);
		cb(err, body.length);

    });
}   //getList

var login = function (cb) {
	console.log('\nthis is the login function\n');
	of.login();
	cb(null, "Yes!");
}

var makeDels = function (cb) {

    var toDel = len - 8;
    fs.appendFile('manystates.txt', '\nready to delete\n');
    console.log('howdy');
    stateD.SID = statesList.pop();
    console.log(stateD.SID);
    request (stateD, function (err, resp, body) {
        if (err) {
            console.error('Error:', err);
            cb(err, null);
        } else {
			console.log(resp.statusCode, body);
            console.log('State deleted: ', stateD.SID);
			fs.appendFile('manyStates.txt', resp.statusCode + body + '\nState deleted: ' + stateD.SID + '\n');
            cb(null, "whoo hoo guru");
        }
    });
    // for (; toDel > 0; --toDel) {
    //     //what about popping the array?
    //     console.log(toDel);
    //     try {
    //         cb(null, "whee!");
    //     } catch (e) {
    //         console.error('Error:', e);
    //         cb(err, null);
    //     }
    // }

}   //makeDels

fs.writeFile('manyStates.txt', 'Deleting Worlds - ' + new Date().toISOString().replace('T', ' ').substr(0, 19) + '\n'),
async.series([
	// fs.writeFile('manyStates.txt', 'Deleting Worlds - ' + new Date().toISOString().replace('T', ' ').substr(0, 19)),
    getList,
	login,
    makeDels,
    getList
	],
	function (err, results) {
		if (err) {
			console.error('Error:', err);
		} else {
			console.log(results);
		}

	});
