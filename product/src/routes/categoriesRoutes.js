import express from "express";
import CategoriesController from "./../controllers/categoriesController.js";
import { authBearer } from "../middlewares/auth.js";

const router = express.Router();

router
	.get("/categories", CategoriesController.readAllCategories)
	.get("/categories/:id", CategoriesController.readCategoryById)
	.post("/admin/categories", authBearer, CategoriesController.createCategories)
	.put("/admin/categories/:id", authBearer, CategoriesController.updateCategory)
	.patch("/admin/categories/:id", authBearer, CategoriesController.activeCategorie)
	.delete("/admin/categories/:id", authBearer, CategoriesController.deleteCategory);

export default router;
