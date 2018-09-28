class DOMNodeCollection {
  constructor(html_elements){
    this.HTMLElements = html_elements;
  }
  
  html(optional_string) {
    if(optional_string === undefined) {
      return this.HTMLElements[0].innerHTML;
    } else {
      for(let i = 0; i< this.HTMLElements.length; i++) {
        this.HTMLElements[i].innerHTML = optional_string;
      }
    }
  }
  
  empty() {
    this.html('');
  }
  
  append(el) {
    if(typeof(el) === 'string'){
      for(let i = 0; i < this.HTMLElements.length; ++i){
        this.HTMLElements[i].innerHTML += el; 
      }
    } else if (el instanceof HTMLElement){
      for(let i = 0; i < this.HTMLElements.length; ++i){
        this.HTMLElements[i].innerHTML += el.outerHTML;
      }
    } else if (el instanceof DOMNodeCollection) {
      for(let i = 0; i < el.HTMLElements.length; i++) {
        for(let j = 0; j < this.HTMLElements.length; j++){
          this.HTMLElements[j].innerHTML += el.HTMLElements[i].outerHTML;
        }
      }
    }
  }
  
  
  children() {
    let array = [];
    for(let i = 0; i < this.HTMLElements.length; ++i){
      array.push(this.HTMLElements[i].children);
    }
    return new DOMNodeCollection(array);
  }
  
  parent(){    
    let array = [];
    for(let i = 0; i < this.HTMLElements.length; ++i){
      array.push(this.HTMLElements[i].parent);
    }
    return new DOMNodeCollection(array);
  }
  
  find(selector){
    let newArray = [];
    for(let i = 0; i < this.HTMLElements.length; ++i){
      newArray.push(this.HTMLElements[i].querySelectorAll(selector));
    }
    return new DOMNodeCollection(newArray);
  }
  
  remove(){
    for(let i = 0; i < this.HTMLElements.length; ++i){
      this.HTMLElements[i].outerHTML = "";
    }
    this.HTMLElements = [];
  }
  
  on(event_name, callback){
    for(let i = 0; i < this.HTMLElements.length; ++i){
      this.HTMLElements[i].addEventListener(event_name, callback);
      this.HTMLElements[i][event_name] = this.HTMLElements[i][event_name] || [];
      this.HTMLElements[i][event_name].push(callback);
    }
  }
  
  off(event_name){
    for(let i = 0; i < this.HTMLElements.length; ++i){
      this.HTMLElements[i].removeEventListener(event_name);
      this.HTMLElements[i][event_name] = [];
    }
  }
}

module.exports = DOMNodeCollection;