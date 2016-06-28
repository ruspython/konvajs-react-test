"use strict";

import Mappersmith from "mappersmith/node";
import Manifest from "./Manifest";

var cachedClients = {};

export let createClient = function(options) {
  options = options || {};

  var clientHash = JSON.stringify(options);

  if (cachedClients[cachedClients]) {
    return cachedClients[clientHash];
  }

  var Client = Mappersmith.forge(Manifest);

  var promisify = function(mod) {
    Object.keys(mod).forEach(function(name) {
      var f = mod[name];
      mod[name] = function(parameters, s) {
        return new Promise(function(resolve, reject) {
          f(parameters, function(result, stats) {
            if (s) {
              s(stats);
            }
            resolve(result);
          }).fail(function(req, error) {
            // console.log("Client Error: ", error);
            reject(error);
          });
        });
      };
    });
  };

  promisify(Client.Customers);


  cachedClients[clientHash] = Client;
  return Client;
};

export let Client = createClient();
