
exports.up = function(knex) {
    return knex.schema.createTable('users', function (t){
        t.increments('id');
        t.string('name').notNullable();
        t.string('email').notNullable();
        t.string('password').notNullable();
        t.string('cpf').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
