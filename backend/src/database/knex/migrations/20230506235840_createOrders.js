exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");

  table.text("order_status").default("pendente");
  table.decimal("order_amount", 6, 2);
  table.text("payment_method");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
