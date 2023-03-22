import jwt from 'jsonwebtoken';

function generateToken(usuario) {
	console.log(usuario._id)
	const payload = {
		id: usuario._id,
	};
	const newToken = jwt.sign(payload, process.env.APP_SECRET, {
		expiresIn: '15m',
	});
	return newToken;
}

class ApiGatewayController {
	static login = async (req, res) => {
		console.log('controller');
		let token = await generateToken(req.user);
		return res.set('Authorization', token).status(204).send();
	};

	static logout = async (req, res) => {
		try {
			return res.status(204).send();
		} catch (error) {
			return res.status(404).send(error);
		}
	};
}

export default ApiGatewayController;