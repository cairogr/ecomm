import client from "./serverRedis.js";
import jwt from "jsonwebtoken";

async function addTokenBlockList(token) {
	const dataExpiration = jwt.decode(token).exp;
	await client.set(token, "Token Logout");
	client.expireAt(token, dataExpiration);
}

async function findTokenBlockList(token) {
	const result = await client.exists(token);
	if (result) {
		throw new jwt.JsonWebTokenError("Token inválido por logout!");
	}
}

export { addTokenBlockList, findTokenBlockList };
