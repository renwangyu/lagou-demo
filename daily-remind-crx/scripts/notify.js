var REMIND_HOUR = 18;
var REMIND_MINUTE = 0;
var ONE_DAY = 24 * 60 * 60 * 1000;
var ONE_HOUR = 60 * 60 * 1000;
var t = null;
var handle = null;

function getRemindDate() {
  var date = new Date();
  date.setHours(REMIND_HOUR, REMIND_MINUTE);
  return date;
}

function notify () {
  var rd = getRemindDate();
  var year = rd.getFullYear();
  var month = rd.getMonth() + 1;
  var dt = rd.getDate();
  
  chrome.notifications.create(null, {
    type: 'basic',
    iconUrl: 'assets/daily-icon.png',
    title: '日报提醒',
    message: year + '年' + month + '月' + dt + '日的日报别忘填~\n' + '还等什么，点我去填写~'
  });
  chrome.notifications.onClicked.addListener(function () {
    chrome.tabs.create({
      url: '//www.baidu.com', // 暂时先这样
    });
  });
}

function remind() {
  if (!handle) {
    var remindTime = +getRemindDate();
    var currTime = new Date().getTime();
    var wait = currTime > remindTime ? (remindTime + ONE_DAY - currTime) : (remindTime - currTime);
    handle = setTimeout(function () {
      notify();
      clearTimeout(handle);
    }, wait);
  }
}

function loopCheck () {
  clearTimeout(t);
  isWorkDay(new Date()) && remind();
  t = setTimeout(loopCheck, ONE_HOUR);
}

window.onload = function () {

  chrome.storage.onChanged.addListener(function (chobj) {
    // eg: { hour: { newValue: 18, oldValue: 22, }, minute: { newValue: 15, oldValue: 30, } }
    if (chobj.hour) {
      REMIND_HOUR = chobj.hour.newValue;
    }
    if (chobj.minute) {
      REMIND_MINUTE = chobj.minute.newValue;
    }
    clearTimeout(handle);
    handle = null;
    loopCheck();
  });

  chrome.storage.sync.get(['hour', 'minute'], function (store) {
    REMIND_HOUR = store.hour || 18;
    REMIND_MINUTE = store.minute || 0;
    loopCheck();
  });
}
