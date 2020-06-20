
exports.up = function(knex) {
    return knex.schema.createTable('companies', function (t){
        t.increments('id');
        t.string('name').notNullable();
        t.string('email').notNullable();
        t.string('password').notNullable();
        t.string('cnpj').notNullable();
    });
};

exports.down = function(knex) {
  
};
