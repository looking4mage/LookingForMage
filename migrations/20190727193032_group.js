
exports.up = function(knex) {
    return knex.schema.createTable('group',(table)=>{
        table.increments('id')
        table.string('name')
        table.boolean('is_public')
        table.integer('type_id').unsigned().notNullable()//Jaka gra
        table.foreign('type_id').references('id').inTable('group_type')
        table.string('avatar')
    })
};

exports.down = function(knex) {
  return knex.scheba.dropTable('group')
};
