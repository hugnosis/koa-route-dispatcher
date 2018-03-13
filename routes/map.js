const pets = require('../controllers/pets');
const asyncPets = require('../controllers/async/pets');

module.exports = (function() {
  return [
    {"path": "/pets", "method": "get", "controller": pets.list, "opts": {}},
    {"path": "/pets/:name", "method": "get", "controller": pets.show},

    {"path": "/async/pets", "method": "get", "controller": asyncPets.list, "opts": {}},
    {"path": "/async/pets/:name", "method": "get", "controller": asyncPets.show, "opts": {}}
  ]
})();
