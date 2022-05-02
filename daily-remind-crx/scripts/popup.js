
$(function () {
  init();
})

function init () {
  // 初始获取本地存储
  chrome.storage.sync.get(['hour', 'minute', 'contents'], function (store) {
    var hour = store.hour || 18;
    var minute = store.minute || 0;
    var contents = store.contents || [];
    $('#hour').val(hour);
    $('#minute').val(minute);
    contents.forEach(function (text) {
      var domStr = '<div class="content-item"><input name="content" type="text" value="' + text + '"><span class="del-btn"></span></div>'
      $(domStr).appendTo($('.content-list'));
    });
    changeDesc({ hour: hour, minute: minute, contents: contents });
  });
  // 内容添加
  $('#create-btn').on('click', function (e) {
    $('<div class="content-item"><input name="content" type="text"><span class="del-btn"></span></div>').appendTo($('.content-list'));
  });
  // 内容删除
  $('.content-list').on('click', '.del-btn', function (e) {
    $(e.currentTarget).parent().remove();
  })
  // 保存按钮
  $('#save-btn').on('click', function (e) {
    var hour = $('#hour').val();
    var minute = $('#minute').val();
    var contents = [];
    $('input[name="content"]').each(function (index) {
      contents.push($(this).val());
    })
    var param = {
      hour: hour,
      minute: minute,
      contents: contents
    }
    chrome.storage.sync.set(param, function () {
      changeDesc(param);
    })
  });
  $('#jump-btn').on('click', function (e) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var dt = now.getDate();
    var fmt = year + '-' + month + '-' + (dt < 10 ? '0' + dt : dt);
    chrome.tabs.create({
      url: 'https://www.baidu.com',
    });
  });
  $('#notifyBtn').on('click', function(e) {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'assets/daily-icon.png',
      title: '通知测试',
      message: '这是一条通往百度的通知~'
    });
    chrome.notifications.onClicked.addListener(function () {
      chrome.tabs.create({
        url: 'https://www.baidu.com',
      });
    });
  })
}

function del (elem) {
  $(elem).parent().remove();
}

function changeDesc (param) {
  var dayType = '工作日';
  var h = param.hour;
  var m = param.minute == 0 ? '0' + param.minute : param.minute;
  var len = param.contents.length;
  var desc = dayType + h + ':' + m + (len > 0 ? '  (' +  len + '条内容)' : '')
  $('#desc').text(desc);
}
