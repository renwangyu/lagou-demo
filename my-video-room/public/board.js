const boardCanvas = document.getElementById('board-canvas');
const ctx = boardCanvas.getContext('2d');

let drawing = false;
const buffer = [];

boardCanvas.addEventListener('mousedown', e => {
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  drawing = true;
  buffer.push({ x: e.offsetX, y: e.offsetY });
}, false);

boardCanvas.addEventListener('mousemove', e => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    buffer.push({ x: e.offsetX, y: e.offsetY });
  }
}, false);

boardCanvas.addEventListener('mouseup', e => {
  if (drawing) {
    drawing = false;
    sendData([...buffer]);
    buffer.length = 0;
  }
}, false);

let localConnCache = {};

myPeer.on('connection', conn => {
  conn.on('data', data => {
    if (data.length === 0) return;
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    
    ctx.moveTo(data[0].x, data[0].y);
    for (let i = 0; i < data.length; i++) {
      ctx.lineTo(data[i].x, data[i].y);
    }
    ctx.stroke();
  })
});

function sendData(data) {
  for (let i = 0; i < remoteIds.length; i++) {
    const rid = remoteIds[i];
    if (localConnCache[rid] && localConnCache[rid].open) {
      localConnCache[rid].send(data);
    } else {
      const conn = myPeer.connect(rid);
      conn.on('open', () => {
        conn.send(data);
      })
      localConnCache[rid] = conn;
    }
  }
}
