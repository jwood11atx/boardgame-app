exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("boardgames", function(table) {
            table.increments("id").primary();
            table.string("title");
            table.timestamps();
        }),
        knex.schema.createTable("categories", function(table){
            table.increments("id").primary();
            table.string("type");
            table.timestamps();
        }),
        knex.schema.createTable("mechanisms", function(table){
            table.increments("id").primary();
            table.string("type");
            table.timestamps();
        }),
        knex.schema.createTable("designers", function(table){
            table.increments("id").primary();
            table.string("type");
            table.timestamps();
        }),
        knex.schema.createTable("families", function(table){
            table.increments("id").primary();
            table.string("type");
            table.timestamps();
        }),
        knex.schema.createTable("boardgame_mechanisms", function(table){
            table.increments("id").primary();
            table.integer("boardgame_id")
                 .references("id")
                 .inTable("boardgames");
            table.integer("mechanisms_id")
                 .references("id")
                 .inTable("mechanisms");
            table.timestamps();
        }),
        knex.schema.createTable("boardgame_categories", function(table){
            table.increments("id").primary();
            table.integer("boardgame_id")
                 .references("id")
                 .inTable("boardgames");
            table.integer("categories_id")
                 .references("id")
                 .inTable("categories");
            table.timestamps();
        }),
        knex.schema.createTable("boardgame_designers", function(table){
            table.increments("id").primary();
            table.integer("boardgame_id")
                 .references("id")
                 .inTable("boardgames");
            table.integer("designers_id")
                 .references("id")
                 .inTable("designers");
            table.timestamps();
        }),
        knex.schema.createTable("boardgame_families", function(table){
            table.increments("id").primary();
            table.integer("boardgame_id")
                 .references("id")
                 .inTable("boardgames");
            table.integer("families_id")
                 .references("id")
                 .inTable("families");
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("boardgame_mechanisms"),
        knex.schema.dropTable("boardgame_categories"),
        knex.schema.dropTable("boardgame_designers"),
        knex.schema.dropTable("boardgame_families"),
        knex.schema.dropTable("boardgames"),
        knex.schema.dropTable("categories"),
        knex.schema.dropTable("mechanisms"),
        knex.schema.dropTable("designers"),
        knex.schema.dropTable("families")
    ])
};
