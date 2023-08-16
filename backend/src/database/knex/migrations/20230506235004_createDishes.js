exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id").primary();
  table.text("name");
  table.text("description");
  table.text("category");
  table.decimal("price", 5, 2);
  table.varchar("image");
});

exports.down = knex => knex.schema.dropTable("dishes");
