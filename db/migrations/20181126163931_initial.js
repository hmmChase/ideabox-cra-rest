exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ideas', table => {
      table.increments('id').primary();
      table.string('idea');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('ideas')]);
};
