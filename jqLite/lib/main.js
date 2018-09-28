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
   
  function extend(...objects) {
    
  }
  
  function ajax(options){
      //step 1 - create xhr object
    const xhr = new XMLHttpRequest();

    // step 2 - specify path and verb
    xhr.open(options.type, options.url);

    // step 3 - register a callback
    xhr.onload = function () {
      console.log(xhr.status); // for status info
      console.log(xhr.responseType); //the type of data that was returned
      console.log(xhr.response); //the actual response. For JSON api calls, this will be a JSON string
      options.success(xhr.response);
      
      if(options.error) options.error();
    };

    // step 4 - send off the request with optional data
    xhr.send(options);
  }
  
};
