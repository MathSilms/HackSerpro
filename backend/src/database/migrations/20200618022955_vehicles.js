
exports.up = function(knex) {
    return knex.schema.createTable('vehicles', function (t){
        t.decimal('user_id').notNullable();
        t.foreign('user_id').references('id').inTable('users');
        t.string('type').notNullable();
        t.string('board').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicles');
};
