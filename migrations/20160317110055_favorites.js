
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table){
  	table.increments(),
  	table.integer('user_id').unsigned(),
  	table.integer('canvas_id').unsigned()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
