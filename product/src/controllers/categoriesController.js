import categories from "../models/categories.js";

class CategoriesController {
	static readAllCategories = (req, res) => {
		try {
			categories.find((err, categories) => {
				res.status(200).json(categories);
			});
		} catch (error) {
			res.status(404).json(error);
		}
	};
	static createCategories = (req, res) => {
		let categoria = new categories(req.body);

		categoria.save((err) => {
			if (err) {
				res
					.status(500)
					.send({ message: `${err.message} - falha ao cadastrar Categoria.` });
			} else {
				res.status(201).send(categoria.toJSON());
			}
		});
	};

	static readCategoryById = (req, res) => {
		const id = req.params.id;

		categories.findById(id, (err, categories) => {
			if (err) {
				res.status(404).send({
					message: `${err.message} - Id da Categoria não localizado.`,
				});
			} else {
				res.status(200).send(categories);
			}
		});
	};

	static updateCategory = (req, res) => {
		const id = req.params.id;

		categories.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Categoria atualizada com sucesso" });
			} else {
				res.status(404).send({ message: err.message });
			}
		});
	};

	static deleteCategory = (req, res) => {
		const id = req.params.id;

		categories.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.status(204).send({ message: "Categoria removida com sucesso" });
			} else {
				res.status(404).send({ message: err.message });
			}
		});
	};

	static activeCategorie = (req, res) => {
		const id = req.params.id;

		categories.findByIdAndUpdate(id, { $set: { status: true } }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Categoria ativada com sucesso" });
			} else {
				res.status(404).send({ message: err.message });
			}
		});
	};
}

export default CategoriesController;
