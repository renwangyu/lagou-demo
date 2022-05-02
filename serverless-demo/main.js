const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const app = new Koa();
const htmlPath = path.resolve(__filename, '../index.html');

app.use(async (ctx, next) => {
  const url = ctx.path;
  if (url === '/') {
    const html = fs.readFileSync(htmlPath, "utf-8");
    ctx.body = html;
  }
  if (url.startsWith('/fetch')) {
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
console.log('[serverless demo] is starting at port 3000');
