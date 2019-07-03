
exports.up = function(knex,Promise) {
    return knex.schema.createTable('game', (table) => {
        table.increments('id')
        table.string('name')
        table.string('thumbnail')
    
    })
};

exports.down = function(knex,Promise) {
   return knex.schema.dropTable('game')
};
