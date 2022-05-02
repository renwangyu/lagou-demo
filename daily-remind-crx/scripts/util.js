var testFun = {
  time2s: function (time) {
    return time / 1000;
  },
  time2date: function (time) {
    return new Date(time);
  },
  fmt: function (time) {
    var d = this.time2date(time);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var dt = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    return year + '-' + month + '-' + dt + ' ' + hour + ':' + minute + ':' + second;
  }
}

function isWorkDay (date) {
  return [1, 2, 3, 4, 5].indexOf(date.getDay()) > -1;
}
