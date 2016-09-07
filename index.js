
'use strict';

/**
 * Module dependencies.
 */

const route = require('koa-route');
const compose = require('koa-compose');
const debug = require('debug')('koa-route-dispatcher');

module.exports = function dispatcher(rules, prefix) {
  var middleware = [];

  prefix = prefix || require.main.filename.replace(/[^\/]*$/, '');
  rules = rules || [];

  rules.forEach(function (rule) {
    debug('Add route rule: %j', rule);

    let method = (rule.method || rule.method == '') ? rule.method.toLowerCase() : 'all';
    let path = rule.path || '';
    let controller = rule.controller || '';
    let func;
    let module;

    if ('' === path || '' === controller) {
      throw Error('Cannot read \'controller or path\' (rule: ' + JSON.stringify(rule) + ')');
    }

    if ('string' == typeof controller) {
      controller = controller.split('.');

      try {
        module = require(prefix + controller.shift());
      } catch (err) {
        err.message += ' (module path: ' + __dirname + ' )';
        console.error(err.stack);
        return;
      }

      while (func = controller.shift()) {
        if (module[func]) {
          module = module[func];
        } else {
          throw ReferenceError('function is not defined (controller: ' + rule.controller + ')');
        }
      }
    } else {
      module = controller;
    }

    if ('GeneratorFunction' !== module.constructor.name) {
      throw TypeError('dispatcher\'s controller requires a generator function (controller: ' + rule.controller + ')');
    }

    middleware.push(route[method](path, module));
  });

  return compose(middleware);
};
