
exports.up = function(knex) {
  return knex.schema.createTable('profiles', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('cnpj').notNullable();
      table.string('email').notNullable();
      table.string('contact').notNullable();
      table.string('materials').nullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  }) ;
};

exports.down = function(knex) {
    return knex.schema.dropTable('profiles');
};
