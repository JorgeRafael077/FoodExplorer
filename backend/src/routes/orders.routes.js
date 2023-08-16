const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const OrdersAdminController = require("../controllers/OrdersAdminController");
const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");


const ordersController = new OrdersController();
const ordersAdminController = new OrdersAdminController();

const ordersRoutes = Router();

ordersRoutes.get("/admin", ensureAuthenticatedAdmin, ordersAdminController.index);
ordersRoutes.put("/", ensureAuthenticatedAdmin, ordersAdminController.update);

ordersRoutes.get("/", ensureAuthenticatedUser, ordersController.index);
ordersRoutes.post("/", ensureAuthenticatedUser, ordersController.create);

module.exports = ordersRoutes;