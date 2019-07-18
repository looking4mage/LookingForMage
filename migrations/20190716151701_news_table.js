
exports.up = function(knex) {
  return knex.schema.createTable('user',table=>{
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated').defaultTo(knex.fn.now())
    table.string('user_name')
    table.string('password')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};