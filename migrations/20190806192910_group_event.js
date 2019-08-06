
exports.up = function(knex) {
    return knex.schema.createTable('group_event',(table)=>{
        table.increments('id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('planned_to').defaultTo(knex.fn.now())
        table.string('name')
        table.integer('group_id').unsigned().notNullable()//Jaka gra
        table.foreign('group_id').references('id').inTable('group')
    })
};

exports.down = function(knex) {
    return knex.scheba.dropTable('group_event')
};
