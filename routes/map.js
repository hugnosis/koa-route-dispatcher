const pets = require('../controllers/pets');

module.exports = (function() {
  return [
    {"path": "/pets", "method": "get", "controller": pets.list, "opts": {}},
    {"path": "/pets/:name", "method": "get", "controller": pets.show}
  ]
})();
