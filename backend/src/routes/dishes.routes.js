const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishesImageController = require("../controllers/DishImageController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureAuthenticatedAdmin = require("../middleware/ensureAuthenticadedAdmin");


const dishesController = new DishesController();
const dishesImageController = new DishesImageController();

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

dishesRoutes.post("/", ensureAuthenticatedAdmin, upload.single("image"), dishesController.create);
dishesRoutes.put("/:id", ensureAuthenticatedAdmin, dishesController.update);
dishesRoutes.patch("/image/:id", ensureAuthenticatedAdmin, upload.single("image"), dishesImageController.update);
dishesRoutes.delete("/:id", ensureAuthenticatedAdmin, dishesController.delete);

dishesRoutes.get("/", ensureAuthenticated, dishesController.index);
dishesRoutes.get("/:id", ensureAuthenticated, dishesController.show);

module.exports = dishesRoutes;