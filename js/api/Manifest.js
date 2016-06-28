"use strict";

var BASE_HOST = 'http://127.0.0.1:3000';


var Manifest = {
  host: BASE_HOST + "/api",
  resources: {
    Customers: {
      all: {
        path: "/customers/"
      }
    },
  }
};

export default Manifest;
