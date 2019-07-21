
exports.up = function(knex) {
    return knex.schema.createTable('news',table=>{
      table.increments('id')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
      table.string('title')
      table.string('content')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('id').inTable('user')
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('news');
  };