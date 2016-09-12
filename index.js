
'use strict';

/**
 * Module dependencies.
 */

const route = require('koa-route');
const compose = require('koa-compose');
const debug = require('debug')('koa-route-dispatcher');

module.exports = function dispatcher(maps, controllerPath) {
  var middleware = [];

  controllerPath = controllerPath || require('path').dirname(require.main.filename) + '/controllers/';
  maps = maps || [];

  maps.forEach(function (map) {
    debug('Add route map: %j', map);

    let method = (map.method || map.method == '') ? map.method.toLowerCase() : 'all';
    let path = map.path || '';
    let controller = map.controller || '';
    let opts = map.opts;
    let func;
    let module;

    if ('' === path || '' === controller) {
      throw Error('Cannot read \'controller or path\' (map: ' + JSON.stringify(map) + ')');
    }

    if ('string' == typeof controller) {
      controller = controller.split('.');

      try {
        module = require(controllerPath + controller.shift());
      } catch (err) {
        err.message += ' (module path: ' + __dirname + ' )';
        console.error(err.stack);
        return;
      }

      while (func = controller.shift()) {
        if (module[func]) {
          module = module[func];
        } else {
          throw ReferenceError('function is not defined (controller: ' + map.controller + ')');
        }
      }
    } else {
      module = controller;
    }

    if ('GeneratorFunction' !== module.constructor.name) {
      throw TypeError('dispatcher\'s controller requires a generator function (controller: ' + map.controller + ')');
    }

    middleware.push(route[method](path, module, opts));
  });

  return compose(middleware);
};
