export default function () {
  // 禁止双击放大
  document.documentElement.addEventListener(
    'touchstart',
    function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    },
    false
  );
  let lastTouchEnd = 0;
  document.documentElement.addEventListener(
    'touchend',
    function (event) {
      let now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
}
