# koa-route-dispatcher

 [koa-route](https://github.com/koajs/route): support JSON format

```js
var routeRules = require('./routes/rules.json')
app.use(dispatcher(routeRules, __dirname + '/controller/'));
```
 routes/rules.json
```json
[
  {"path": "/pets", "method": "get", "controller": "pets.list", "opts": ""},
  {"path": "/pets/:name", "method": "get", "controller": "pets.show"}
]
```
