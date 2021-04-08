// 根据屏幕变化设置rem,默认1920*1080

(function(designW, designH) {
    var doc = document,
      docEl = doc.documentElement,
      remStyle = document.createElement("style"),
      tid;
      // 标准宽高比
      const DESIGN_RATIO = designW / designH
      function refreshRem() {
        // 获取宽高
        const WIDTH = document.documentElement.clientWidth
        const HEIGHT = document.documentElement.clientHeight
        // 实际宽高比
        const CURRENT_RATIO = WIDTH / HEIGHT
        let rem = 100
        if(CURRENT_RATIO > DESIGN_RATIO) {
          rem = HEIGHT / designH * 100
        } else {
          rem = WIDTH / designW * 100
        }
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
      }

      if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(remStyle);
      } else {
          var wrap = doc.createElement("div");
          wrap.appendChild(remStyle);
          doc.write(wrap.innerHTML);
          wrap = null;
      }
      //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
      refreshRem();
      window.addEventListener("resize", function() {
          clearTimeout(tid); //防止执行两次
          tid = setTimeout(refreshRem, 300);
      }, false);

      window.addEventListener("pageshow", function(e) {
          if (e.persisted) { // 浏览器后退的时候重新计算
              clearTimeout(tid);
              tid = setTimeout(refreshRem, 300);
          }
      }, false);

      if (doc.readyState === "complete") {
        // doc.body.style.fontSize = "16px";
      } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
          // doc.body.style.fontSize = "16px";
        }, false);
      }
  })(1920, 1080);