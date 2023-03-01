import categories from "../models/categories.js";

class CategoriesController {
	static readAllCategories = (req, res) => {
		// #swagger.tags = ['Categories']
		// #swagger.description = 'Exibe todas as categorias cadastradas.'
		try{
			categories.find((err, categories) => {
				res.status(200).json(categories);
			});}
		catch(error){
			res.status(404).json(error);
		}
		/* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Categories" },
        description: 'Sucesso!' 
    } */
	};
	static createCategories = (req, res) => {
		// #swagger.tags = ['Categories']
		// #swagger.description = 'Cadastra Categorias'
		/* #swagger.parameters['info'] = {
        in: 'body',
        required: true,
        schema: {
                    $name: 'Phone',
                    $status: true || false,
                }
    } */
		let categoria = new categories(req.body);

		categoria.save((err) => {
			if (err) {
				res
					.status(500)
					.send({ message: `${err.message} - falha ao cadastrar Categoria.` });
				/* #swagger.responses[500] = { 
            description: 'Falha ao cadastrar Categoria!' 
          } */
			} else {
				res.status(201).send(categoria.toJSON());
				/* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/Categories" },
            description: 'Criado com Sucesso!' 
          } */
			}
		});
	};

	static readCategoryById = (req, res) => {
		// #swagger.tags = ['Categories']
		// #swagger.description = 'Exibe detalhes de uma categoria.'
		/* #swagger.parameters['id'] = { 
        description: 'ID da categoria.',
        in: 'path',
        type: Number
    }*/
		const id = req.params.id;

		categories.findById(id, (err, categories) => {
			if (err) {
				res
					.status(404)
					.send({
						message: `${err.message} - Id da Categoria não localizado.`,
					});
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria não localizada!' 
        } */
			} else {
				res.status(200).send(categories);
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Sucesso!' 
        } */
			}
		});
	};

	static updateCategory = (req, res) => {
		// #swagger.tags = ['Categories']
		// #swagger.description = 'Atualiza dados de uma categoria.'
		/* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID da Categoria para atualizar',
        type: 'number'
    } */

		const id = req.params.id;

		categories.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Categoria atualizada com sucesso" });
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria atualizada com sucesso!' 
        } */
			} else {
				res.status(404).send({ message: err.message });
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria não encontrada!' 
        } */
			}
		});
	};

	static deleteCategory = (req, res) => {
		// #swagger.tags = ['Categories']
		// #swagger.description = 'Deleta uma categoria.'
		/* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID da Categoriaque será deletada',
        type: 'number'
    } */
		const id = req.params.id;

		categories.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.status(204).send({ message: "Categoria removida com sucesso" });
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria Removida com Sucesso!' 
        } */
			} else {
				res.status(404).send({ message: err.message });
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria não encontrada!' 
        } */
			}
		});
	};

	static activeCategorie = (req, res) => {
		const id = req.params.id;
		// #swagger.tags = ['Categories']
		// #swagger.description = 'Endpoint para alterar o status da categoria para ativa.'
		/* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID da Categoria para ativar',
        type: 'number'
    } */

		categories.findByIdAndUpdate(id, { $set: { status: true } }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Categoria ativada com sucesso" });
				/* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria Ativa com Sucesso!' 
        } */
			} else {
				res.status(404).send({ message: err.message });
				/* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Categories" },
          description: 'Categoria não encontrada!' 
        } */
			}
		});
	};
}

export default CategoriesController;
