
exports.up = function(knex) {
    return knex.schema.createTable('user_token',table=>{
        table.string('token')
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('user')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_token');
};
