//setup
var request = require('request');

// Cookies are disabled by default (else, they would be used in subsequent requests). To enable cookies, set jar to true (either in defaults or options) and install tough-cookie.
request = request.defaults({jar: true})
request('http://www.google.com', function () {
  request('http://images.google.com')
})

// To use a custom cookie jar (instead of request’s global cookie jar), set jar to an instance of request.jar() (either in defaults or options)
var j = request.jar()
var request = request.defaults({jar:j})
request('http://www.google.com', function () {
  request('http://images.google.com')
})
// OR
var j = request.jar();
var cookie = request.cookie('key1=value1');
var url = 'http://www.google.com';
j.setCookie(cookie, url);
request({url: url, jar: j}, function () {
  request('http://images.google.com')
})

// To use a custom cookie store (such as a FileCookieStore which supports saving to and restoring from JSON files), pass it as a parameter to request.jar():
// var FileCookieStore = require('tough-cookie-filestore');
// NOTE - currently the 'cookies.json' file must already exist!
// var j = request.jar(new FileCookieStore('cookies.json'));
// request = request.defaults({ jar : j })
// request('http://www.google.com', function() {
//   request('http://images.google.com')
// })

// The cookie store must be a tough-cookie store and it must support synchronous operations; see the CookieStore API docs for details.
//
// To inspect your cookie jar after a request:
var j = request.jar()
request({url: 'http://www.google.com', jar: j}, function () {
  var cookie_string = j.getCookieString(url); // "key1=value1; key2=value2; ..."
  var cookies = j.getCookies(url);
  // [{key: 'key1', value: 'value1', domain: "www.google.com", ...}, ...]
  console.log('Cookie String: ' + cookie_string);
  console.log('Cookie: ' + cookie_string);
})
