
exports.up = function(knex) {
  return knex.schema.createTable('user',(t)=>{
    t.string('guid')
    t.string('email')
    t.string('name')
    t.string('password')
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
