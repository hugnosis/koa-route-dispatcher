# koa-route-dispatcher

[![NPM](https://nodei.co/npm/koa-route-dispatcher.png?downloads=true)](https://nodei.co/npm/koa-route-dispatcher/)

[koa-route](https://github.com/koajs/route): support JSON format

```js
var dispatcher = require('koa-route-dispatcher');
var routesMap = require('./routes/map.json'); //map.js
app.use(dispatcher(routesMap));
```

routes/map.json
```json
[
  {"path": "/pets", "method": "get", "controller": "pets.list", "opts": {}},
  {"path": "/pets/:name", "method": "get", "controller": "pets.show"}
]
```
[path-to-regexp](https://www.npmjs.com/package/path-to-regexp){: target="_blank" } in use at koa-route
- **path** An Express-style string, an array of strings, or a regular expression.
- **opts**
  - **sensitive** When `true` the route will be case sensitive. (default: `false`)
  - **strict** When `false` the trailing slash is optional. (default: `false`)
  - **end** When `false` the path will match at the beginning. (default: `true`)

## Syntax
```js
dispatcher(routesMap [, controllersPath='/workingDirectory/controllers/']);
```

## Installation
```js
$ npm install koa-route-dispatcher
```
