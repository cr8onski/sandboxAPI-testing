// this should call tom, then if everything is ok
// call the anon function, then andy
// you can also add an option function that'll
// take all the results passed into the call back
//.... so
var async = require('async');

async.series([
	tom,
    function (cb) {
      console.log('next');
      cb(null, 55);
    },
    andy
],
function(err, res) {
	for (r in res) console.log(res[r]);
});

function tom (cb) {
	console.log('tom.. first?');
    cb(null, 'tom');
}

function andy (cb) {
	console.log('andy.. last call in series');
    cb(null, 'ang');
}
