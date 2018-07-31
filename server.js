// var http = require("http"),
//     port = process.env.PORT || 1881;  
// var server = http.createServer(function(request,response){  
//     response.writeHeader(200, {"Content-Type": "text/plain"});  
//     response.write("Hello HTTP!");  
//     response.end();  
// }); 
// server.listen(port);  
// console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);

var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 1881; 

http.createServer(function (request, response) {
    console.log('request starting...');
    // var filePath = '.' + request.url;
    // if (filePath == './')
    //     filePath = './public/index.html';
    var filePath = './public/' + request.url;

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
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(port);
console.log("Server Running on "+port+".\nLaunch http://localhost:"+port);