
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
