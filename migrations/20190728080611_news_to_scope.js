
exports.up = function(knex) {
    return knex.schema.table('news', table => {
        table.integer('scope_id').unsigned().notNullable()
        table.foreign('scope_id').references('id').inTable('news_scope')
    })
};

exports.down = function(knex) {
  
};
