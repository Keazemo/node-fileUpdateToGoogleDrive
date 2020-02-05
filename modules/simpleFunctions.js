function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function _log(text){
    var g = new Date();
    console.log(addZero(g.getHours()) + ":" + addZero(g.getMinutes()) + ":" + addZero(g.getSeconds()) + " | " + text);
}
module.exports = _log;
