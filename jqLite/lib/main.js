const DOMNodeCollection = require('dom_node_collection');
window.$l = function(el) {

  
  let funcArray = [];
  
  if(typeof(el) === "string") {
    const domEls = document.querySelectorAll(el);
    let elementArray = Array.from(domEls);
    return elementArray;
  
  } else if(el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  
  } else if(el instanceof Function){
    funcArray.push(el);
  }
  
  window.document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < funcArray.length; i++) {
      funcArray[i]();
    }
  });
   
};
