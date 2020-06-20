
exports.up = function(knex) {
    return knex.schema.createTable('marketplace', function (t){
        t.string('company_id');
        t.foreing('company_id').references('id').inTable('companies');
        t.string('name').notNullable();
        t.string('cep').notNullable();
        t.string('rua').notNullable();
        t.string('bairro').notNullable();
        t.string('cidade').notNullable();
    });
};

exports.down = function(knex) {
  
};
