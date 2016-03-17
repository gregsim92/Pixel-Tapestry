
exports.up = function(knex, Promise) {
  return knex.schema.createTable('canvas', function(table){
  	table.increments(),
  	table.text('name'),
//#TODO: find out how to store data about a tapestry so that when queried, can replicate it
	table.text('img'),
	table.integer.unsigned('favorites')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('canvas')
};
