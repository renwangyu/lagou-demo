const Koa = require('koa');
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const axios = require('axios');
const ejs = require('ejs');
const utils = require('../utils');

const app = new Koa();

app.use(async (ctx, next) => {
  const url = ctx.path;
  if (url === '/') {
    ejs.renderFile('ejs-demo/index.ejs', {
      title: 'ejs ssr', 
      nowTime: utils.getNowTime(),
      type: 'koa'
    }, 
    (err, data) => {
      if (err ) {
        console.log(err);
      } else {
        ctx.body = data;
      }
    });
  }
  if (url.startsWith('/fetch')) {
    // axios
    //   .get('https://service-74wozqgb-1300487260.sh.apigw.tencentcs.com/release/helloworld-1648998692')
    //   .then(res => {
    //     console.log(`状态码: ${res.statusCode}`)
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    ctx.respond = false;
    console.log(ctx);
    await k2c(
      createProxyMiddleware({
        target: 'https://service-74wozqgb-1300487260.sh.apigw.tencentcs.com/release/helloworld-1648998692',
        changeOrigin: true,
        secure: false,
      }),
    )(ctx, next)
  }
  return await next();
});

app.listen(3000);
console.log('[koa ssr demo] is starting at port 3000');
