function getNowTime() {
  const dayStrArr = ['日', '一', '二', '三', '四', '五', '六'];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = dayStrArr[now.getDay()];
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  return `${year}.${month}.${date} 周${day} ${hour}:${min}:${sec}`;
}

exports.getNowTime = getNowTime;
