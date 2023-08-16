const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticatedUser = require("../middleware/ensureAuthenticatedUser");

const favoritesController = new FavoritesController();

const favoriteRoutes = Router();

favoriteRoutes.use(ensureAuthenticatedUser);

favoriteRoutes.post("/", favoritesController.create);
favoriteRoutes.get("/", favoritesController.index);
favoriteRoutes.delete("/:id", favoritesController.delete);

module.exports = favoriteRoutes;