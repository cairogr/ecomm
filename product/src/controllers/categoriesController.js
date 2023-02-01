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

  static detalhamentoCategoriaPorId = (req, res) => {
    const id = req.params.id;

    categories.findById(id, (err, categories) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id da Categoria não localizado.`})
      } else {
        res.status(200).send(categories);
      }
    })
  }


  static alteraCategoria = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria atualizada com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }


  static removeCategoria = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Categoria removida com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default CategoriesController