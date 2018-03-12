
'use strict';

/**
 * Module dependencies.
 */

const route = require('koa-route');
const compose = require('koa-compose');
const debug = require('debug')('koa-route-dispatcher');

module.exports = function dispatcher(maps, controllersPath) {
  if (!(maps instanceof Array)) {
    throw Error('Only \'Array\' is supported.');    
  }

  let middleware = [];
  const requirePath = controllersPath + '/' || process.cwd() + '/controllers/';

  maps.forEach(function (map) {
    debug('Add route map: %j', map);

    if (!map.path || !map.controller) {
      throw Error('Cannot read \'controller or path\' (map: ' + JSON.stringify(map) + ')');
    }

    const method = map.method ? map.method.toLowerCase() : 'all';
    const path = map.path;
    const opts = map.opts;

    let module;
    if ('string' == typeof map.controller) {
      const controllerPathArr = map.controller.split('.');

      try {
        module = require(requirePath + controllerPathArr.shift());
      } catch (err) {
        console.error(err.stack);
        return;
      }

      while (module = module[controllerPathArr.shift()]) {}
    } else {
      module = map.controller;
    }

    if (module) {
      middleware.push(route[method](path, module, opts));
    }
  });

  return compose(middleware);
};
