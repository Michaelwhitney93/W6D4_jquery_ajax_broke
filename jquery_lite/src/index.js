const DOMNodeCollector = require("../src/dom_node_collection.js");
function $l(arg) {
  $l.ajax = (obj = {}) => {
    const defaults = { 
      type: "GET",
      url: "https://www.appacademy.io",
      // data: {},
      // dataType: "html/text",
      error: () => console.log('fail'),
      // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: () => console.log('yay')
    };
    const request = Object.assign(defaults, obj);
    const xhr = new XMLHttpRequest();
    // debugger 
    xhr.open(`${request.method}`, `${request.url}`, true);
    xhr.onload = function () {
      console.log(xhr.status) // for status info
      console.log(xhr.responseType) //the type of data that was returned
      console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string
    };
    xhr.send();
  };
  const result = [];
  if (typeof arg === 'function') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(arg, 0);
    });
  } else if (arg instanceof HTMLElement)  {
    result.push(arg);
  } else {
    const el = document.querySelectorAll(arg);
    for (let i = 0; i < el.length; i++) {
      result.push(el[i]);
    }
  }
  return new DOMNodeCollector(result);
}

window.$l = $l;
$l(() => console.log('Fully Loaded'));