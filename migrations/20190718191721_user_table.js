
exports.up = function(knex) {
  return knex.schema.createTable('user',table=>{
    table.increments('id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated').defaultTo(knex.fn.now())
    table.string('user_name')
    table.string('password')
    table.string('email')
    table.integer('profile_id').unsigned().notNullable()
    table.foreign('profile_id').references('id').inTable('user_profile')
    table.integer('gamer_profile_id').unsigned().notNullable()
    table.foreign('gamer_profile_id').references('id').inTable('user_gamer_profile')
    

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};