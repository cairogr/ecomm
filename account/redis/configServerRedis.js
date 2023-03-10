import client from "./serverRedis.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";

const existsAsync = promisify(client.exists).bind(client);
const setAsync = promisify(client.set).bind(client);

async function addTokenBlockList(token){
	const dataExpiration = jwt.decode(token).exp;
	console.log("data",dataExpiration);
	await setAsync(token, "");
	client.expireAt(token, dataExpiration);

}

async function findTokenBlockList(token){
	const result = await existsAsync(token);
	return result === 1;
}

export {addTokenBlockList, findTokenBlockList};