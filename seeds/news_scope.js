
exports.seed = function(knex) {
      return knex('news_scope').insert([
        {id: 1, name: 'All'},
        {id: 2, name: 'Friends'},
        {id: 3, name: 'Public'}
      ]);
};
