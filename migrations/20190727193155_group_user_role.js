
exports.up = function(knex) {
    return knex.schema.createTable('user_group_role',(table)=>{
        table.increments('id')
        table.string('name')
    })
};

exports.down = function(knex) {
  return knex.scheba.dropTable('user_group_role')
};
