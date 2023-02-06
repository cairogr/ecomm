import express from "express";
import ProductsController from "./../controllers/productsController.js";

const router = express.Router();

router
  .get("/products", ProductsController.realAllProducts)
  .get("/products/:id", ProductsController.readProductById)
  .post("/admin/products", ProductsController.createProducts)
  .put("/admin/products/:id", ProductsController.updateProducts)
  .delete("/admin/products/:id", ProductsController.deleteProduct)


export default router;   