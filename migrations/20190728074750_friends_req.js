
exports.up = function(knex) {
    return knex.schema.createTable('friends_request',(table)=>{
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('user')
        table.integer('friend_id').unsigned().notNullable()//Jaka gra
        table.foreign('friend_id').references('id').inTable('user')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
  return knex.scheba.dropTable('friends_request')
};
