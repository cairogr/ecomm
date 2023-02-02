import express from "express";
import ProductsController from "../controllers/ProductsController.js";

const router = express.Router();

router
  .get("/products", ProductsController.listagemProdutos)
  .get("/products/:id", ProductsController.detalhamentoProdutoPorId)
  .post("/products", ProductsController.insercaoProdutos)
  .put("/products/:id", ProductsController.alteraProduto)
  .delete("/products/:id", ProductsController.removeProduto)


export default router;   