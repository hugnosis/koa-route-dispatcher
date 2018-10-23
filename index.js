
'use strict';

/**
 * Module dependencies.
 */

const isGeneratorFunction = require('is-generator-function');
const debug = require('debug')('koa-route-dispatcher');
const route = require('koa-route');
const compose = require('koa-compose');
const convert = require('koa-convert');


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
    if ('string' === typeof map.controller) {
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

    if ('function' === typeof module) {
      if (isGeneratorFunction(module)) {
        process.stderr.write('Support for generators will be removed in v3. ' +
          'See the documentation for examples of how to convert old middleware ' +
          'https://github.com/koajs/koa/blob/master/docs/migration.md');
        module = convert(module);
      }
      middleware.push(route[method](path, module, opts));
    } else {
      process.stderr.write('TypeError: controller must be a function! (map: ' + JSON.stringify(map) + ')' + '\n', 'utf8');
    }
  });

  return compose(middleware);
};
