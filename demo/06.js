var http = require('http');
var path = require('path');
var fs = require('fs');
// var mime = require('mime');


var server = http.createServer();

server.on('request', function (req, res) {
  var url = req.url.toLowerCase();

  url = (url === '/') ? '/index.html' : url;
  var filePath = path.join(__dirname, url);
  console.log("🚀 ~ filePath:", filePath)

  // res.setHeader('Content-Type', mime.lookup(url));

  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log("🚀 ~ err:", err)

      if (err.code === 'ENOENT') {

        res.setHeader('Content-Type', 'text/html; charset=utf8');
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.end('<h1>请求的资源不存在！</h1>');

      } else if (err.code === 'EACCES') {

        res.setHeader('Content-Type', 'text/html; charset=utf8');
        res.statusCode = 403;
        res.statusMessage = 'Forbidden';
        res.end('<h1>Permission denied！</h1>');
      } else {

        throw err;
      }

    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(data);
    }
  })
});

server.listen(3000, function () {
  console.log('server is running, please visit: http://localhost:3000');
});