var url = require('url');
var express = require('express');
const cors = require('cors');
var compression = require('compression');
var path = require('path');
var port = process.env.PORT || 1881; 
var app = express();
// viewed at http://localhost:1881

app.use(compression());
app.disable('x-powered-by');

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: \nSitemap: http://"+req.headers.host+"/sitemap.xml");
});

app.get('/manifest.json', function (req, res) {
    filePath = '/public/manifest.json'; 
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/googlea9ce7ea88d34d673.html', function (req, res) {
    filePath = '/public/googlea9ce7ea88d34d673.html'; 
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/browserconfig.xml', function (req, res) {
    filePath = '/public/browserconfig.xml'; 
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/sw.js', function (req, res) {
    filePath = '/public/sw.js'; 
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/sitemap.xml', function (req, res) {
    filePath = '/public/sitemap.xml';
    if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/sitemap-en.xml';
    
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/', function(req, res) {
    var filePath = '.' + req.url;
    if (filePath == './')
        if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/index_en.html';
        else
        filePath = '/public/index.html';
        res.sendFile(path.join(__dirname + filePath));
});

app.listen(port);