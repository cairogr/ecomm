import express from "express";
import CategoriesController from "../controllers/CategoriesController.js";

const router = express.Router();

router
  .get("/categories", CategoriesController.listagemCategorias)
  .get("/categories/:id", CategoriesController.detalhamentoCategoriaPorId)
  .post("/categories", CategoriesController.insercaoCategorias)


export default router;   