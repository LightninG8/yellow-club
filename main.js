(() => {

  // if (!window.userInfo.isAdmin) {
  //   return;
  // }

  
  // Боковое меню
  JSinjection('/pl/layout/21687/0/left-menu.js');
  CSSinjection('/pl/layout/21687/1/left-menu-css.css');



})()











function JSinjection(fileName, callback) {
  var script = document.createElement( "script" )
  script.type = "text/javascript";
  if(typeof callback != "undefined") {
    if(script.readyState) {  // only required for IE <9
      script.onreadystatechange = function() {
        if ( script.readyState === "loaded" || script.readyState === "complete" ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function() {
        callback();
      };
    }
  }
  script.src = fileName;
  script.crossOrigin = "anonymous";
  document.getElementsByTagName( "head" )[0].appendChild( script );
}


function CSSinjection(fileName, callback) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.crossOrigin = "anonymous";
  if(typeof callback != "undefined") {
    link.onload = callback();
  }
  link.href = fileName;
  document.head.appendChild(link);
}
