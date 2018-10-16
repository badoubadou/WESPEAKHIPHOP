var url = require('url');
var express = require('express');
var app = express();
var compression = require('compression');
var path = require('path');
var port = process.env.PORT || 1881; 
// viewed at http://localhost:1881
app.use(compression());
app.get('/', function(req, res) {
    var q = url.parse(req.url, true);
    var urlStr = 'http://' + req.headers.host + req.url,
    parsedURL = url.parse( urlStr ,true );
    var filePath = '.' + req.url;
    if (filePath == './')
        if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/index_en.html';
        else
        filePath = '/public/index.html';
        res.sendFile(path.join(__dirname + filePath));
});

app.listen(port);