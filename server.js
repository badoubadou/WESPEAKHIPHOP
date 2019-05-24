var url = require('url');
var express = require('express');
const cors = require('cors');
var compression = require('compression');
var path = require('path');
var port = process.env.PORT || 1881; 
var app = express();
// viewed at http://localhost:1881

var forceSsl = function (req, res, next) {
    if ((req.headers.host == 'www.wespeakhiphop.fr') || (req.headers.host == 'wespeakhiphop.fr')){
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
    }
    return next();
};

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options));
/// redirige les request sur le dossier public

app.use(forceSsl);
app.use(compression());
app.disable('x-powered-by');

app.get('/googlea9ce7ea88d34d673.html', function (req, res) {
    filePath = '/public/googlea9ce7ea88d34d673-fr.html'; 
    if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/googlea9ce7ea88d34d673.html'; 
    
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/', function(req, res) {
    filePath = '/public/index.html';
    console.log('???');
    if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/index_en.html';
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/sitemap.xml', function(req, res) {
    filePath = '/public/sitemap.xml';
    if ((req.headers.host == 'www.wespeakhiphop.com') || (req.headers.host == 'wespeakhiphop.com'))
        filePath = '/public/sitemap-en.xml';
    res.sendFile(path.join(__dirname + filePath));
});

app.get('/en', function(req, res) {
    var filePath = '/public/index_en.html';
    res.sendFile(path.join(__dirname + filePath));
});

app.use(function(req, res, next){
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
        filePath = '/public/404.html';
        res.sendFile(path.join(__dirname + filePath));
        return;
    }
});



app.listen(port);