import products from "../models/products.js";

class ProductsController {

  static listagemProdutos = (req, res) => {
    products.find((err, products) => {
      res.status(200).json(products)
  })
  }
  static insercaoProdutos = (req, res) => {
    let produto = new products(req.body);

    produto.save((err) => {

      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar Produto.`})
      } else {
        res.status(201).send(produto.toJSON())
      }
    })
  }
  static detalhamentoProdutoPorId = (req, res) => {
    const id = req.params.id;

    products.findById(id, (err, products) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id da Produto não localizado.`})
      } else {
        res.status(200).send(products);
      }
    })
  }
  static alteraProduto = (req, res) => {
    const id = req.params.id;

    products.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Produto atualizada com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
  static removeProduto = (req, res) => {
    const id = req.params.id;

    products.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Produto removida com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }
}

export default ProductsController