import express from "express";
import ProductsController from "./../controllers/productsController.js";
import { authBearer } from "../middlewares/auth.js";

const router = express.Router();

router
	.get("/products", ProductsController.readAllProducts)
	.get("/products/:id", ProductsController.readProductById)
	.post("/admin/products", authBearer, ProductsController.createProducts)
	.put("/admin/products/:id", authBearer, ProductsController.updateProducts)
	.delete("/admin/products/:id", authBearer, ProductsController.deleteProduct);

export default router;
