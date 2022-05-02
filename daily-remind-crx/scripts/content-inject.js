function inject () {
  var day = [7, 1, 2, 3, 4, 5, 6][new Date().getDay()];
  chrome.storage.sync.get(['contents'], function (store) {
    var contents = store.contents || [];
    var textList = [];
    if (isSaved(day)) {
      // 把td里的内容存下来
      $('#zcon' + day + '>table>tbody>tr:first-child>td').each(function () {
        textList = textList.concat($(this).text().replace(/<br\/?>/ig, '\n').split('\n'))
      });
      $('#zu' + day + '>img').click(); // 点击编辑按钮
    }
    setTimeout(function () {
      var textareaVal = $('textarea.editable').val() ? $('textarea.editable').val().split('\n') : [];
      textList = textareaVal.length > 0 ? textareaVal : textList;
      if (contents.length > 0) {
        var fmtContents = contents.map(function (text, index) {
          return (textList.length + index + 1) + '. ' + text;
        });
        textList = textList.concat(fmtContents);
      }
      $('textarea.editable').val(textList.join('\n'));
    }, 1000);
  });
}

function isSaved(day) {
  // 是否保存过判断依据：进入后不显示保存按钮
  return $('#zu_' + day).css('display') == 'none';
}

$(function () {
  inject();
});
