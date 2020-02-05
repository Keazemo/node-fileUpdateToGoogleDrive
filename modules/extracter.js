const fs = require('fs');
const unzip = require('unzip');
const mkdirp = require('mkdirp');
const _log = require('./simpleFunctions');
function extracter(fileName){
    _log("UNZIP PROCESS - DECECT ZIP FILE");
    var folderExtract = fileName.substr(0, fileName.lastIndexOf('.'));
    mkdirp("./extractZIPS/"+folderExtract, function (err) {
        if (err) _log(err)
    });
    fs.createReadStream("./downloaded/"+fileName).pipe(unzip.Extract({ path: "./extractZIPS/"+folderExtract }));
    _log("EXTRACT FINISH!");
}
module.exports = extracter;