
exports.up = function(knex) {
    return knex.schema.createTable('user_gamer_profile',table=>{
        table.increments('id')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated').defaultTo(knex.fn.now())
        table.string('steam_profile_link')
        table.string('battle_net_profile_link')
    
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_gamer_profile');
};
