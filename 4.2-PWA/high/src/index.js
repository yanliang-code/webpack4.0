console.log('hello，world');

// 若浏览器支持serviceWorker，执行以下逻辑
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('service-worker registed');
      })
      .catch((error) => {
        console.log('service-worker registed error');
      });
  });
}
