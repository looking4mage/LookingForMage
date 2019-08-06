
exports.up = function(knex) {
    return knex.schema.createTable('group_post',(table)=>{
        table.increments('id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.string('title')
        table.string('content')
        table.integer('author_id').unsigned().notNullable()
        table.foreign('author_id').references('id').inTable('user')
        table.integer('group_id').unsigned().notNullable()
        table.foreign('group_id').references('id').inTable('group')
    })
};

exports.down = function(knex) {
    return knex.scheba.dropTable('group_post')
};
