
exports.up = function(knex) {
    return knex.schema.createTable('group_type',(table)=>{
        table.increments('id')
        table.string('name')
        table.string('avatar')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('group_type')
};
