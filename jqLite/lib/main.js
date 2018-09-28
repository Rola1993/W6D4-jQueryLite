const DOMNodeCollection = require('dom_node_collection');
window.$l = function(el) {
  if(typeof(el) === "string") {
    const domEls = document.querySelectorAll(el);
    let elementArray = Array.from(domEls);
    return elementArray;
  } else if(el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } 
};
