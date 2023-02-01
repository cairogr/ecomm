import categories from "../models/categories.js";

class CategoriesController {

  static listagemCategorias = (req, res) => {
    categories.find((err, categories) => {
      res.status(200).json(categories)
  })
  }
  static insercaoCategorias = (req, res) => {
    let categoria = new categories(req.body);

    categoria.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar Categoria.`})
      } else {
        res.status(201).send(categoria.toJSON())
      }
    })
  }
}

export default CategoriesController