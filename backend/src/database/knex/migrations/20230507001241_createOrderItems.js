exports.up = knex => knex.schema.createTable("order_items", table => {
  table.increments("id").primary();

  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");

  table.integer("quantity");
  table.decimal("unit_price", 5, 2);
});

exports.down = knex => knex.schema.dropTable("order_items");
