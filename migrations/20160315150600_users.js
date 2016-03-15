
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
  	table.increments(),
  	table.text('username'),
  	table.text('email'),
  	table.text('password')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
