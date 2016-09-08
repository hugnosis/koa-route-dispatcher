# koa-route-dispatcher

[![NPM](https://nodei.co/npm/koa-route-dispatcher.png?downloads=true)](https://nodei.co/npm/koa-route-dispatcher/)

[koa-route](https://github.com/koajs/route): support JSON format

```js
var dispatcher = require('koa-route-dispatcher');
var routeRules = require('./routes/rules.json'); // require('./routes/rules.js')
app.use(dispatcher(routeRules));
```
routes/rules.json
```json
[
  {"path": "/pets", "method": "get", "controller": "pets.list", "opts": ""},
  {"path": "/pets/:name", "method": "get", "controller": "pets.show"}
]
```
## Syntax

```js
dispatcher(routeRulesArr[, controllersPath='/workingDirectory/controllers/']);
```
## Installation

```js
$ npm install koa-route-dispatcher
```
