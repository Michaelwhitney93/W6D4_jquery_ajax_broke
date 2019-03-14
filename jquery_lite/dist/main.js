/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(arr){\n    this.arr = arr;\n  }\n  html (string) {\n    if (string === undefined) {\n      return this.arr[0].innerHTML;\n    } else {\n      for (let i = 0; i < this.arr.length; i++) {\n        this.arr[i].innerHTML = string;\n      }\n    }\n  }\n  empty () {\n    this.html(\"\");\n  }\n  append(...args){\n  //each parent should know their kids. no deadbeats allowed\n  for(let i = 0; i < args.length; i++) {\n    if (args[i] instanceof DOMNodeCollection) {\n      args[i] = args[i].arr;\n    }\n\n  }\n  args = args.flat();\n  for (let i = 0; i < this.arr.length; i++) {\n    for (let j = 0; j < args.length; j++) {\n      if (typeof args[j] === 'string') {\n        this.arr[i].innerHTML += (args[j]);\n      } else {\n        this.arr[i].innerHTML += args[j].outerHTML;\n      }\n      }\n    }\n  }\n  \n  addClass(arg) {\n    for(let i = 0; i < this.arr.length; i++){\n      let attrClass = this.arr[i].getAttribute('class');\n      let classes = [];\n      if (attrClass) {\n        classes = attrClass.split(\" \");\n      }\n      if (classes.includes(arg)) {\n        continue;\n      } else if(attrClass) {\n        this.arr[i].className = attrClass + ' ' + arg;\n      } else {\n        this.arr[i].setAttribute('class', arg);\n      }\n\n    }\n\n  }\n\n  removeClass(arg) {\n    for (let i = 0; i < this.arr.length; i++) {\n      let attrClass = this.arr[i].getAttribute('class').split(\" \");\n      let idx = attrClass.indexOf(arg);\n      if (attrClass.includes(arg)) {\n        attrClass = attrClass.slice(0,idx).concat(attrClass.slice(idx+1));\n      }\n      this.arr[i].className = attrClass.join(\" \");\n    }\n  }\n\n  attr(key, val) {\n    for (let i = 0; i < this.arr.length; i++) {\n      if (typeof key === 'string' && val === undefined) {\n        return this.arr[i].getAttribute(`${key}`);\n    } else if (key instanceof Object) {\n      for (let el in key) {\n        this.arr[i].setAttribute(`${el}`, `${key[el]}`);\n      }\n    } else if (typeof val === 'function') {\n        let keyStr = `${key}`;\n        this.arr[i].setAttribute(`${key}`, `${val(i, this.arr[i].getAttribute(keyStr))}`);\n    } else {\n      this.arr[i].setAttribute(`${key}`, `${val}`);\n    }\n    }\n  }\n\n  children() {\n    let result = [];\n    for (let oi = 0; oi < this.arr.length; oi++){\n      if (this.arr[oi].children.length > 0){\n        result.push(this.arr[oi].children);\n      }\n    }\n    result = result.flat();\n    return new DOMNodeCollection(result);\n  }\n  parent() {\n    let result = [];\n    for (let oi = 0; oi < this.arr.length; oi++) {\n      if (this.arr[oi].parentElement) {\n        result.push(this.arr[oi].parentElement);\n      }\n    }\n    result = result.flat();\n    return new DOMNodeCollection(result);\n  }\n  find (selector) {\n    let result = [];\n    for (let i = 0; i < this.arr.length ; i++){\n      let things = this.arr[i].querySelectorAll(selector)\n      if (things.length > 0){\n        result.push(things);\n      }\n    }\n    return new DOMNodeCollection(result);\n  }\n  remove(selector){\n    for(let i = 0; i < this.arr.length; i++){\n      if (selector === undefined){\n        this.arr[i].outerHTML = \"\";\n      } else {\n        let things = this.arr[i].querySelectorAll(selector);\n        for(let oi = 0; oi <things.length; oi++){\n          things[oi].outerHTML = \"\";\n        }\n      }\n    }\n  }\n  on(event, func){\n    for (let i = 0; i < this.arr.length; i++) {\n      this.arr[i].addEventListener(event, func);\n      this.arr[i][event] = func;\n    }\n  }\n  off(event){ \n    for (let i = 0; i < this.arr.length; i++) {\n      this.arr[i].removeEventListener(event, this.arr[i][event]);\n    }\n  }\n\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollector = __webpack_require__(/*! ../src/dom_node_collection.js */ \"./src/dom_node_collection.js\");\nfunction $l(arg) {\n  $l.ajax = (obj = {}) => {\n    const defaults = { \n      type: \"GET\",\n      url: \"https://www.appacademy.io\",\n      // data: {},\n      // dataType: \"html/text\",\n      error: () => console.log('fail'),\n      // contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n      success: () => console.log('yay')\n    };\n    const request = Object.assign(defaults, obj);\n    const xhr = new XMLHttpRequest();\n    // debugger \n    xhr.open(`${request.method}`, `${request.url}`, true);\n    xhr.onload = function () {\n      console.log(xhr.status) // for status info\n      console.log(xhr.responseType) //the type of data that was returned\n      console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string\n    };\n    xhr.send();\n  };\n  const result = [];\n  if (typeof arg === 'function') {\n    document.addEventListener('DOMContentLoaded', () => {\n      setTimeout(arg, 0);\n    });\n  } else if (arg instanceof HTMLElement)  {\n    result.push(arg);\n  } else {\n    const el = document.querySelectorAll(arg);\n    for (let i = 0; i < el.length; i++) {\n      result.push(el[i]);\n    }\n  }\n  return new DOMNodeCollector(result);\n}\n\nwindow.$l = $l;\n$l(() => console.log('Fully Loaded'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });