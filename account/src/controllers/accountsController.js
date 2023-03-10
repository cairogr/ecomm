import accounts from "./../models/accounts.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
import { addTokenBlockList } from "../../redis/configServerRedis.js";
class AccountsController {
	static readAllAccounts = (req, res) => {
		accounts.find((err, accounts) => {
			res.status(200).json(accounts);
		});
	};

	static login = async (req, res) => {
		let token = await generateToken(req.user);
		return res.set("Authorization", token).status(204).send();
	};

	static logout = async (req, res) => {
		try {
			await addTokenBlockList(req.token);
			return res.status(204).send();
		} catch (error) {
			return res.status(404).send(error);
		}
	};

	static createAccounts = (req, res) => {
		const account = new accounts(req.body);
		const salt = bcrypt.genSaltSync(12);
		const senhaHash = bcrypt.hashSync(req.body.password, salt);
		account.password = senhaHash;

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

	static findEmail = async (email, res) => {
		const user = await accounts.findOne({ email: email });

		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}
	};
}

function generateToken(usuario) {
	const payload = {
		id: usuario._id,
	};
	const newToken = jwt.sign(payload, process.env.APP_SECRET, {
		expiresIn: "15m",
	});
	return newToken;
}

export default AccountsController;
