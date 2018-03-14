# koa-route-dispatcher

[![NPM](https://nodei.co/npm/koa-route-dispatcher.png?downloads=true)](https://nodei.co/npm/koa-route-dispatcher/)

Uber simple route middleware for koa. ([koa-route](https://github.com/koajs/route))
> support JSON format

```js
const dispatcher = require('koa-route-dispatcher');
const routesMap = require('./routes/map.json'); //map.js
app.use(dispatcher(routesMap));
```

## Syntax
```js
dispatcher(routesMap [, controllersPath='/workingDirectory/controllers/']);
```

If you need a full-featured solution check out [koa-router](https://github.com/alexmingoia/koa-router), a Koa clone of express-resource.

## Installation
```js
$ npm install koa-route-dispatcher
```

## Example
```js
// app.js
const Koa = require('koa');
const app = new Koa();
const dispatcher = require('koa-route-dispatcher');
const routesMap = require('./routes/map.json');

app.use(dispatcher(routesMap, './controllers/'));
app.listen(3000);

console.log('listening on port 3000');
```
```js
// reoutes/map.json
[
  {"path": "/pets", "method": "get", "controller": "pets.list", "opts": {}},
  {"path": "/pets/:name", "method": "get", "controller": "pets.show"},
  {"path": "/async/pets", "method": "get", "controller": "/async/pets.list", "opts": {}},
  {"path": "/async/pets/:name", "method": "get", "controller": "/async/pets.show", "opts": {}}
]
```
```js
// controllers/async/pets.js
function getDBAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        tobi: { name: 'tobi', species: 'ferret' },
        loki: { name: 'loki', species: 'ferret' },
        jane: { name: 'jane', species: 'ferret' }
      });
    }, 2000);
  });
}

module.exports = {
  list: async (ctx) => {
    const db = await getDBAfter2Seconds();

    const names = Object.keys(db);
    ctx.body = 'pets: ' + names.join(', ');
  },

  show: function* (name) {
    const ctx = this;
    const db = yield getDBAfter2Seconds();

    const pet = db[name];
    if (!pet) return ctx.throw(404, 'cannot find that pet');
    ctx.body = pet.name + ' is a ' + pet.species;
  }
};
```

## License
MIT

