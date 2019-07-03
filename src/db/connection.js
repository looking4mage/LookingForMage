const config = require('../config/global').database;
var knex = require('knex')({
    client: config.client,
    connection: {
      host : config.host,
      user : config.user,
      password : config.password,
      database : config.database
    }
  });
  module.exports = knex