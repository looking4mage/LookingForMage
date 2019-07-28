
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('group_type').insert([
        {id: 1, name: 'World of warcraft'},
        {id: 2, name: 'Dungeons and Smoki'},
      ]);
};
