class DOMNodeCollection {
  constructor(arr){
    this.arr = arr;
  }
  html (string) {
    if (string === undefined) {
      return this.arr[0].innerHTML;
    } else {
      for (let i = 0; i < this.arr.length; i++) {
        this.arr[i].innerHTML = string;
      }
    }
  }
  empty () {
    this.html("");
  }
  append(...args){
  //each parent should know their kids. no deadbeats allowed
  for(let i = 0; i < args.length; i++) {
    if (args[i] instanceof DOMNodeCollection) {
      args[i] = args[i].arr;
    }

  }
  args = args.flat();
  for (let i = 0; i < this.arr.length; i++) {
    for (let j = 0; j < args.length; j++) {
      if (typeof args[j] === 'string') {
        this.arr[i].innerHTML += (args[j]);
      } else {
        this.arr[i].innerHTML += args[j].outerHTML;
      }
      }
    }
  }
  
  addClass(arg) {
    for(let i = 0; i < this.arr.length; i++){
      let attrClass = this.arr[i].getAttribute('class');
      let classes = [];
      if (attrClass) {
        classes = attrClass.split(" ");
      }
      if (classes.includes(arg)) {
        continue;
      } else if(attrClass) {
        this.arr[i].className = attrClass + ' ' + arg;
      } else {
        this.arr[i].setAttribute('class', arg);
      }

    }

  }

  removeClass(arg) {
    for (let i = 0; i < this.arr.length; i++) {
      let attrClass = this.arr[i].getAttribute('class').split(" ");
      let idx = attrClass.indexOf(arg);
      if (attrClass.includes(arg)) {
        attrClass = attrClass.slice(0,idx).concat(attrClass.slice(idx+1));
      }
      this.arr[i].className = attrClass.join(" ");
    }
  }

  attr(key, val) {
    for (let i = 0; i < this.arr.length; i++) {
      if (typeof key === 'string' && val === undefined) {
        return this.arr[i].getAttribute(`${key}`);
    } else if (key instanceof Object) {
      for (let el in key) {
        this.arr[i].setAttribute(`${el}`, `${key[el]}`);
      }
    } else if (typeof val === 'function') {
        let keyStr = `${key}`;
        this.arr[i].setAttribute(`${key}`, `${val(i, this.arr[i].getAttribute(keyStr))}`);
    } else {
      this.arr[i].setAttribute(`${key}`, `${val}`);
    }
    }
  }

  children() {
    let result = [];
    for (let oi = 0; oi < this.arr.length; oi++){
      if (this.arr[oi].children.length > 0){
        result.push(this.arr[oi].children);
      }
    }
    result = result.flat();
    return new DOMNodeCollection(result);
  }
  parent() {
    let result = [];
    for (let oi = 0; oi < this.arr.length; oi++) {
      if (this.arr[oi].parentElement) {
        result.push(this.arr[oi].parentElement);
      }
    }
    result = result.flat();
    return new DOMNodeCollection(result);
  }
  find (selector) {
    let result = [];
    for (let i = 0; i < this.arr.length ; i++){
      let things = this.arr[i].querySelectorAll(selector)
      if (things.length > 0){
        result.push(things);
      }
    }
    return new DOMNodeCollection(result);
  }
  remove(selector){
    for(let i = 0; i < this.arr.length; i++){
      if (selector === undefined){
        this.arr[i].outerHTML = "";
      } else {
        let things = this.arr[i].querySelectorAll(selector);
        for(let oi = 0; oi <things.length; oi++){
          things[oi].outerHTML = "";
        }
      }
    }
  }
  on(event, func){
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].addEventListener(event, func);
      this.arr[i][event] = func;
    }
  }
  off(event){ 
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].removeEventListener(event, this.arr[i][event]);
    }
  }


}

module.exports = DOMNodeCollection;