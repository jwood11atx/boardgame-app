exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("boardgames", function(table) {
          table.increments("rank").primary();
          table.integer("id").unique();
          table.string("name");
          table.string("thumbnail");
          table.string("image");
          table.string("description", 15000);
          table.integer("minplayers");
          table.integer("maxplayers");
          table.integer("yearpublished");
          table.integer("playingtime");
        }),
        knex.schema.createTable("categories", function(table){
          table.increments("id").primary();
          table.string("type");
        }),
        knex.schema.createTable("mechanisms", function(table){
          table.increments("id").primary();
          table.string("type");
        }),
        knex.schema.createTable("families", function(table){
          table.increments("id").primary();
          table.string("type");
        }),
        knex.schema.createTable("designers", function(table){
          table.increments("id").primary();
          table.string("type");
        }),
        knex.schema.createTable("artists", function(table){
          table.increments("id").primary();
          table.string("type");
        }),
        knex.schema.createTable("publishers", function(table){
          table.increments("id").primary();
          table.string("type");
        }),
        knex.schema.createTable("boardgame_mechanisms", function(table){
          table.increments("id").primary();
          table.integer("boardgame_id")
               .references("id")
               .inTable("boardgames");
          table.integer("mechanism_id")
               .references("id")
               .inTable("mechanisms");
        }),
        knex.schema.createTable("boardgame_categories", function(table){
          table.increments("id").primary();
          table.integer("boardgame_id")
               .references("id")
               .inTable("boardgames");
          table.integer("category_id")
               .references("id")
               .inTable("categories");
        }),
        knex.schema.createTable("boardgame_families", function(table){
          table.increments("id").primary();
          table.integer("boardgame_id")
               .references("id")
               .inTable("boardgames");
          table.integer("family_id")
               .references("id")
               .inTable("families");
        }),
        knex.schema.createTable("boardgame_designers", function(table){
          table.increments("id").primary();
          table.integer("boardgame_id")
               .references("id")
               .inTable("boardgames");
          table.integer("designer_id")
               .references("id")
               .inTable("designers");
        }),
        knex.schema.createTable("boardgame_artists", function(table){
          table.increments("id").primary();
          table.integer("boardgame_id")
               .references("id")
               .inTable("boardgames");
          table.integer("artist_id")
               .references("id")
               .inTable("artists");
        }),
        knex.schema.createTable("boardgame_publishers", function(table){
          table.increments("id").primary();
          table.integer("boardgame_id")
               .references("id")
               .inTable("boardgames");
          table.integer("publisher_id")
               .references("id")
               .inTable("publishers");
        })
        //============DO NOT UNCOMMENT===========//
        // knex.schema.createTable("boardgame_ids", function(table){
        //   table.increments("rank").primary();
        //   table.integer("bg_id").unique();
        // })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("boardgame_mechanisms"),
        knex.schema.dropTable("boardgame_categories"),
        knex.schema.dropTable("boardgame_families"),
        knex.schema.dropTable("boardgame_designers"),
        knex.schema.dropTable("boardgame_artists"),
        knex.schema.dropTable("boardgame_publishers"),
        knex.schema.dropTable("boardgames"),
        knex.schema.dropTable("categories"),
        knex.schema.dropTable("mechanisms"),
        knex.schema.dropTable("families"),
        knex.schema.dropTable("designers"),
        knex.schema.dropTable("artists"),
        knex.schema.dropTable("publishers")
        //============DO NOT UNCOMMENT===========//
        // knex.schema.dropTable("boardgame_ids")
    ])
};
