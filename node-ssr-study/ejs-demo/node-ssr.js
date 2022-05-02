const ejs = require('ejs');
const http = require('http');
const utils = require('../utils');

http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    ejs.renderFile('ejs-demo/index.ejs', {
        title: 'ejs ssr', 
        nowTime: utils.getNowTime(),
        type: 'node'
      }, 
      (err, data) => {
      if (err ) {
        console.log(err);
      } else {
        res.end(data);
      }
    });
  }
}).listen(3001, () => {
  console.log('[node ssr demo] is starting at port 3001');
});