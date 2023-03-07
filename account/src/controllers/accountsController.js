import accounts from "./../models/accounts.js";
class AccountsController {

	static readAllAccounts = (req, res) => {
		accounts.find((err, accounts) => {
			res.status(200).json(accounts);
		});
	};

	static createAccounts = (req, res) => {
		let account = new accounts(req.body);

		account.save((err) => {
			if (err) {
				res
					.status(500)
					.send({ message: `${err.message} - falha ao cadastrar usuário.` });
			} else {
				res.status(201).send(account.toJSON());
			}
		});
	};

	static readAccountById = (req, res) => {
		const id = req.params.id;

		accounts.findById(id, (err, accounts) => {
			if (err) {
				res
					.status(404)
					.send({ message: `${err.message} - Id do usuário não localizado.` });
			} else {
				res.status(200).send(accounts);
			}
		});
	};

	static updateAccount = (req, res) => {
		const id = req.params.id;

		accounts.findByIdAndUpdate(id, { $set: req.body }, (err) => {
			if (!err) {
				res.status(200).send({ message: "Usuário atualizado com sucesso" });
			} else {
				res.status(404).send({ message: err.message });
			}
		});
	};

	static deleteAccount = (req, res) => {
		const id = req.params.id;

		accounts.findByIdAndDelete(id, (err) => {
			if (!err) {
				res.status(204).send({ message: "Usuário removido com sucesso" });
			} else {
				res.status(404).send({ message: err.message });
			}
		});
	};
}

export default AccountsController;
