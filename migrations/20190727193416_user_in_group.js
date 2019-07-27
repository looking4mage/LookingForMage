
exports.up = function(knex) {
    return knex.schema.createTable('group_user',(table)=>{
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('user')
        table.integer('group_id').unsigned().notNullable()//Jaka gra
        table.foreign('group_id').references('id').inTable('group')
        table.integer('role_id').unsigned().notNullable()
        table.foreign('role_id').references('id').inTable('user_group_role')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  return knex.scheba.dropTable('group_user')
};
