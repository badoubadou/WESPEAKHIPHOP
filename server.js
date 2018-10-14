var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var zlib = require('zlib');
var port = process.env.PORT || 1881; 

http.createServer(function (request, response) {
    var q = url.parse(request.url, true);
    console.log('request starting...'+q);
    var urlStr = 'http://' + request.headers.host + request.url,
    parsedURL = url.parse( urlStr ,true );

    console.log(request.headers.host+'  ????');
    var filePath = '.' + request.url;
    if (filePath == './')
        if ((request.headers.host == 'www.wespeakhiphop.com') || (request.headers.host == 'wespeakhiphop.com'))
            filePath = './public/index_en.html';
        else
            filePath = './public/index.html';


    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.woff2':
            contentType = 'font/font-woff2';
            break;
        case '.woff':
            contentType = 'font/font-woff';
            break;
    }
    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            var raw = fs.createReadStream(filePath);
            var acceptEncoding = request.headers['accept-encoding'];
            if (!acceptEncoding) {
                acceptEncoding = '';
            }

            // Note: this is not a conformant accept-encoding parser.
            // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
            if (acceptEncoding.match(/\bdeflate\b/)) {
                response.writeHead(200, { 'content-encoding': 'deflate', 'Content-Type': contentType });
                raw.pipe(zlib.createDeflate()).pipe(response);
            } else if (acceptEncoding.match(/\bgzip\b/)) {
                response.writeHead(200, { 'content-encoding': 'gzip' ,  'Content-Type': contentType });
                raw.pipe(zlib.createGzip()).pipe(response);
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                raw.pipe(response);
            }
            // response.writeHead(200, { 'Content-Type': contentType });
            // response.end(content, 'utf-8');
        }
    });
}).listen(port);
console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);