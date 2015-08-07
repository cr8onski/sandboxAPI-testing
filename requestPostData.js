var fs = require('fs')
  , path = require('path')
  , http = require('http')
  , request = require('request')
  , TMP_FILE_PATH = path.join(path.sep, 'tmp', 'foo')
;

// write a temporary file:
fs.writeFileSync(TMP_FILE_PATH, 'foo bar baz quk\n');

http.createServer(function(req, res) {
  console.log('the server is receiving data!\n');
  req
    .on('end', res.end.bind(res))
    .pipe(process.stdout)
  ;
}).listen(3000).unref();

fs.createReadStream(TMP_FILE_PATH)
  .pipe(request.post('http://127.0.0.1:3000'))
;