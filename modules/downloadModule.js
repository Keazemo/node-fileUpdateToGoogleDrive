//includes
const http = require('http');
const fs = require('fs');
const _log = require('./simpleFunctions');
const extracter = require('./extracter');
/*
  TODO
    POBIERANIE OGRANICZONE NA IP
    NAPRAWA PROGRESSU PRZY DWÓCH PLIKACH
    

*/
var percent = 0;
var endDownload = false;
var pobieranie = false;

var download = function(fileName, url){
    pobieranie = true;
    _log("Rozpoczęto pobieranie pliku " + fileName);
    const file = fs.createWriteStream('downloaded/' + fileName);
    const request = http.get(url, function(response) {
        var len = parseInt(response.headers['content-length'], 10);
        var total = len / 1048576;
        var cur = 0;
        response.pipe(file);
        response.on("data", function(chunk){
            cur += chunk.length;
            percent = (100.0 * cur / len).toFixed(2);
        });
        response.on("end", function() {
          _log("Downloading complete!");
          if(fileName.substr(fileName.lastIndexOf('.')) == ".zip"){ // decect zip files
              extracter(fileName);
          }
          endDownload = true;
          pobieranie = false;
        }
      );
    
  });
};
var pobieranieReturn = function(){return pobieranie};
var percentReturn = function(){return percent};
var endDownloadReturn = function(){return endDownload};
module.exports.download = download;
module.exports.pobieranie = function(){return pobieranie};
module.exports.percent = function(){return percent;};
module.exports.endDownload = function(){return endDownload;};
module.exports.setEndDownload = function(x){endDownload = x;};