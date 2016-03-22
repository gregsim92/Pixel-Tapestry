
exports.up = function(knex, Promise) {
  return knex.schema.createTable('canvas', function(table){
  	table.increments(),
  	table.text('name'),
  	table.text('canvas_data'),
	table.text('img_url'),
	table.integer('favorites').unsigned()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('canvas')
};
