exports.seed = function(knex, Promise) {
  return knex("boardgames").del()
  .then(() => {
    return Promise.all([
      knex("boardgames").insert({
        title: "Catan",
        created_at: new Date()
      }),
      knex("boardgames").insert({
        title: "Splendor",
        created_at: new Date()
      })
    ]);
  });
};
