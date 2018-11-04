var url = require('url');
var express = require('express');
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
app.get('/sitemap.xml', function (req, res) {
    filePath = '/public/sitemap.html';
    if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/sitemap-en.html';
    
    res.sendFile(path.join(__dirname + filePath));

});
app.get('/', function(req, res) {
    var q = url.parse(req.url, true);
    var urlStr = 'http://' + req.headers.host + req.url,
    parsedURL = url.parse( urlStr ,true );
    var filePath = '.' + req.url;
    var extname = path.extname(filePath);

    if((extname=='.jpg') || (extname=='.png') || (extname=='.svg') )
        res.setHeader("Cache-Control", "public, max-age=2592000");
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());

    if((extname=='.css') || (extname=='.js') )
        res.setHeader("Cache-Control", "public, max-age=2592000");
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());

    if (filePath == './')
        if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/index_en.html';
        else
        filePath = '/public/index.html';
        res.sendFile(path.join(__dirname + filePath));

});

app.listen(port);