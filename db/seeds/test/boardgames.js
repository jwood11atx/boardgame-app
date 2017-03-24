exports.seed = function(knex, Promise) {
  return knex("boardgames").del()
  .then(() => {
    return Promise.all([
      knex("boardgames").insert({
        id: 13,
        name: "Catan"
      }),
      knex("boardgames").insert({
        id: 148228,
        name: "Splendor"
      }),
      knex("boardgames").insert({
        id: 30549,
        name: "Pandemic"
      })
    ]);
  });
};
