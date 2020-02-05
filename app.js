//includes
const http = require('http');
const fs = require('fs');
const mkdirp = require('mkdirp');
const _log = require('./modules/simpleFunctions');
const open = require('open');

const extracter = require('./modules/extracter');
var downloadModule = require('./modules/downloadModule');
//const googleAPI = require('./modules/googleAPI');

var percent = downloadModule.percent();
var endDownload = downloadModule.endDownload();
var pobieranie = downloadModule.pobieranie();
//server MODUŁ GŁÓWNY
//req.connection.remoteAddress
var server = http.createServer(function(req, res){
    if(req.url != "/progress")_log("DEBUG REQUEST " + req.url);
    if(req.method == "POST"){
        body = "";
        req.on('data', function(d){
            body+=d;
        });
        req.on('end', function(){
            var linkToFile = decodeURIComponent(body.substr(body.indexOf("link=")+5, body.indexOf("&")-5));
            var fileNameToSave = body.substr(body.indexOf("&name=")+6);
            if(!pobieranie)downloadModule.download(fileNameToSave, linkToFile);
        });
    }
    if(req.url == "/"){
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.createReadStream('./pageFiles/index.html').pipe(res);
        /*open(googleAPI.authLink, function(err){
            if(err)_log(err);
        });*/
    } else if(req.url == "/progress"){
        if(!downloadModule.endDownload()) {
            percent = downloadModule.percent();
            res.end(percent);
        } else {
            res.end("endDownload");
            downloadModule.setEndDownload(false);
        };

    } else if(req.url == "/download"){
        //if(!pobieranie)download("zabawa.zip", "http://artweddizi.cluster023.hosting.ovh.net/vetter976hjs/09zabawa.zip");
        
    } else if(req.url == "/bg.jpg"){
      var img = fs.readFileSync('./pageFiles/bg.jpg');
      res.writeHead(200, {'Content-Type': 'image/gif' });
      res.end(img, 'binary');
    }

});

server.listen(3000);
_log("listening port 3000...");

//download("kolezenskie.zip", "http://artweddizi.cluster023.hosting.ovh.net/vetter976hjs/10kolezenskie.zip");
/*
http://artweddizi.cluster023.hosting.ovh.net/vetter976hjs/10kolezenskie.zip
kolezenskie.zip
*/
//download("zabawa.zip", "http://artweddizi.cluster023.hosting.ovh.net/vetter976hjs/09zabawa.zip");
