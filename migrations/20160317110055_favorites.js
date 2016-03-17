
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table){
  	table.increments(),
  	table.integer.unsigned('user_id'),
  	table.integer.unsigned('canvas_id'),

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
