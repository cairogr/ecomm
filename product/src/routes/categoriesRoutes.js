import express from "express";
import CategoriesController from "../controllers/CategoriesController.js";

const router = express.Router();

router
  .get("/categories", CategoriesController.listarCategories)


export default router;   