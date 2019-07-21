
exports.up = function(knex) {
    return knex.schema.createTable('user_profile',table=>{
        table.increments('id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated').defaultTo(knex.fn.now())
        table.string('first_name')
        table.string('last_name')
    
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_profile');
};
