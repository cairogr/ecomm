import express from "express";
import CategoriesController from "./../controllers/categoriesController.js";

const router = express.Router();

router
	.get("/categories", CategoriesController.readAllCategories)
	.get("/categories/:id", CategoriesController.readCategoryById)
	.post("/admin/categories", CategoriesController.createCategories)
	.put("/admin/categories/:id", CategoriesController.updateCategory)
	.patch("/admin/categories/:id", CategoriesController.activeCategorie)
	.delete("/admin/categories/:id", CategoriesController.deleteCategory);

export default router;
