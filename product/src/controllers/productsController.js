import products from "../models/products.js";

class ProductsController {
	static readAllProducts = (req, res) => {
		products.find((err, products) => {
			// #swagger.tags = ['Categories']
			// #swagger.description = 'Exibe todos os produtos cadastrados.'
			res.status(200).json(products);
			/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Sucesso!' 
      } */
		});
	};
	static createProducts = (req, res) => {
		// #swagger.tags = ['Products']
		// #swagger.description = 'Cadastra Produtos.'
		/* #swagger.parameters['info'] = {
        in: 'body',
        required: true,
        schema: {
            $name: "Notebook Samsung",
            $description: "Samsung Book Core i5-1135G7, 8G, 256GB SSD, Iris Xe, 15.6 FHD, W11 Cinza",
            $slug: "notebook-samsung",
            $unitPrice: 3523.00,
            $quantityStock: 1,
            $idCategory: "INFORMÁTICA"
                }
    } */
		let produto = new products(req.body);

		produto.save((err) => {
			if (err) {
				res
					.status(500)
					.send({ message: `${err.message} - falha ao cadastrar Produto.` });
				/* #swagger.responses[500] = { 
          description: 'Falha ao cadastrar Produto!' 
        } */
			} else {
				res.status(201).send(produto.toJSON());
				/* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/Products" },
            description: 'Criado com Sucesso!' 
        } */
			}
		});
	};
	static readProductById = (req, res) => {
		// #swagger.tags = ['Products']
		// #swagger.description = 'Exibe detalhes de um produto.'
		/* #swagger.parameters['id'] = { 
        description: 'ID do produto.',
        in: 'path',
        type: Number
    }*/
		const id = req.params.id;

		products.findById(id, (err, products) => {
			if (err) {
				res
					.status(400)
					.send({ message: `${err.message} - Id da Produto não localizado.` });
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Produto não localizado!' 
        } */
			} else {
				res.status(200).send(products);
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Sucesso!' 
        } */
			}
		});
	};

	static updateProducts = (req, res) => {
		// #swagger.tags = ['Products']
		// #swagger.description = 'Atualiza dados de um produto.'
		/* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID da produto para altualizar',
        type: 'number'
    } */
		const id = req.params.id;

		products.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Produto atualizada com sucesso" });
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Produto atualizado com sucesso!' 
        } */
			} else {
				res.status(500).send({ message: err.message });
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Produto não encontrado!' 
        } */
			}
		});
	};
	static deleteProduct = (req, res) => {
		// #swagger.tags = ['Products']
		// #swagger.description = 'Deleta um produto.'
		/* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID do produto que será deletado',
        type: 'number'
    } */
		const id = req.params.id;

		products.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.status(204).send({ message: "Produto removida com sucesso" });
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Produto removido com Sucesso!' 
        } */
			} else {
				res.status(500).send({ message: err.message });
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Products" },
          description: 'Produto não encontrada!' 
        } */
			}
		});
	};
}

export default ProductsController;
