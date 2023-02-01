import categories from "../models/categories.js";

class CategoriesController {

  static listagemCategories = (req, res) => {
    categories.find((err, categories) => {
      res.status(200).json(categories)
  })
  }

}

export default CategoriesController