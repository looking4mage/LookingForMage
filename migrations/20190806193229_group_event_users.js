
exports.up = function(knex) {
    return knex.schema.createTable('group_event_user',(table)=>{
        table.integer('event_id').unsigned().notNullable()//Jaka gra
        table.foreign('event_id').references('id').inTable('group_event')
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('user')
    })
};

exports.down = function(knex) {
    return knex.scheba.dropTable('group_event_user')
};
