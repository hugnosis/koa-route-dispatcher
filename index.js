
'use strict';

/**
 * Module dependencies.
 */

const co = require('co');
const route = require('koa-route');
const compose = require('koa-compose');
const debug = require('debug')('koa-route-dispatcher');

module.exports = function dispatcher(maps, controllersPath) {
  if (!(maps instanceof Array)) {
    throw Error('Only \'Array\' is supported.');
  }

  let middleware = [];
  const requirePath = (controllersPath || process.cwd() + '/controllers') + '/';

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

      let routeFunc;
      while (routeFunc = module[controllerPathArr.shift()]) {
        module = routeFunc;
      }
    } else {
      module = map.controller;
    }

    if ('function' == typeof module) {
      if ('GeneratorFunction' == module.constructor.name) {
        module = convert(module);
      }
      middleware.push(route[method](path, module, opts));
    } else {
      console.error('TypeError: controller must be a function! (map: ' + JSON.stringify(map) + ')');
      return;
    }
  });

  return compose(middleware);
};

/**
 * Convert koa generator-based to promise-based
 * @Refer koa-convert
 */

function convert(func) {
  return function (ctx, ...args) {
    return co.call(ctx, func.apply(ctx, args));
  }
}
