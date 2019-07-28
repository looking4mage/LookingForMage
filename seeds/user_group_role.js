
exports.seed = function(knex) {
  // Deletes ALL existing entries
      return knex('user_group_role').insert([
        {id: 1, name: 'Owner'},
        {id: 2, name: 'Trooper'}
      ]);
};
