# koa-route-dispatcher

 [koa-route](https://github.com/koajs/route): support JSON format

```js
var routeRules = require('./route-rules.json')
app.use(dispatcher(routeRules, __dirname + '/controllerPrefixPath/'));
```

 route-rules.json
```js
[
  {"path": "/pets", "method": "get", "controller": "pets.list"},
  {"path": "/pets/:name", "method": "get", "controller": "pets.show"}
]
```
