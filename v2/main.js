(() => {
  if (
    checkTruePage({
      notMode: 0,
      strict: 0,
      pages: ["/teach/control"],
    })
  ) {
    // Хлебные крошки
    CSSinjection("/pl/layout/21687/16/module-breadcrumbs.css.css");
    JSinjection("/pl/layout/21687/15/module-breadcrumbs.js.js");
  }

  // Статусы заданий и уроков
  $('.breadcrumbs').ready(() => {
    if($('a[href="/teach/control/stream/view/id/697759636"]').length) {
      CSSinjection("/pl/layout/21687/17/module-lessons-status.css");
      JSinjection("/pl/layout/21687/18/module-lessons-status.js");
    }
  })


  const isWebinar = location.href.split("/").includes("webinar");


  // Для админов и для вебинарной комнаты - отключаем
  if (window.userInfo.isAdmin || isWebinar) {
    return;
  }


  // Боковое меню
  try {
    JSinjection("/pl/layout/21687/0/left-menu.js");
    CSSinjection("/pl/layout/21687/1/left-menu-css.css");
  } catch (e) {
    console.log(e);
  }

  // Вебинарная комната
  if (
    checkTruePage({
      notMode: 0,
      strict: 0,
      pages: ["/pl/webinar/"],
    })
  ) {
    CSSnjection("/pl/layout/21687/3/webinar-room.css");

  }

  // Страница урока
  if (
    checkTruePage({
      notMode: 0,
      strict: 0,
      pages: ["/pl/teach/control/lesson/view"],
    })
  ) {
    CSSinjection("/pl/layout/21687/9/module-widget.css");
    CSSinjection("/pl/layout/21687/13/lesson.css");
    JSinjection("/pl/layout/21687/14/lesson.js");
  }


  
})();

function JSinjection(fileName, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (typeof callback != "undefined") {
    if (script.readyState) {
      // only required for IE <9
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      //Others
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = fileName;
  script.crossOrigin = "anonymous";
  document.getElementsByTagName("head")[0].appendChild(script);
}

function CSSinjection(fileName, callback) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.crossOrigin = "anonymous";
  if (typeof callback != "undefined") {
    link.onload = callback();
  }
  link.href = fileName;
  document.head.appendChild(link);
}

function checkTruePage(opt) {
  let i = false;
  const u = window.location.href;
  const d = location.protocol + "//" + location.hostname;
  opt.pages.forEach((p) => {
    if (opt.strict) {
      if (u == el || u == d + p) i = true;
    } else if (u.indexOf(p) > -1) i = true;
  });
  return opt.notMode ? !i : i;
}
