
exports.up = function(knex) {
    return knex.schema.createTable('news_scope',(table)=>{
        table.increments('id')
        table.string('name')
    })
};

exports.down = function(knex) {
  return knex.scheba.dropTable('news_scope')
};
