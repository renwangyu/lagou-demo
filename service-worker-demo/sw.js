// Service Worker获取的第一个事件，并且只发生一次
self.addEventListener('install', event => {
  console.log('sw: installing…');
  self.skipWaiting();
  // 传递到installEvent.waitUntil() 的一个promise可表明安装的持续时间以及安装是否成功
  event.waitUntil(
    // cache assets
    caches.open('static-v1').then(cache => {
      cache.addAll([
        '/demo.html',
        '/owl.png',
      ])
    })
  );
});
// 第一次注册并安装成功后，会触发activate事件
self.addEventListener('activate', event => {
  console.log('sw: activate!');
});
// 监听fetch
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // 如果是wolf，就返回owl
  if (url.origin == location.origin && url.pathname == '/wolf.png') {
    event.respondWith(caches.match('/owl.png'));
  }
});

self.addEventListener('message', e => {
  // 向特定窗口返回消息
  e.source.postMessage(`Service Worker回应: ${e.data} 时间戳: ${Date.now()}`);
});
