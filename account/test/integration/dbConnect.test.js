import { expect, describe, it } from "@jest/globals";
import db from "../../src/config/dbConnect.js";

const STATUS = {
	0: "Disconectado",
	1: "Conectado",
	2: "Conectando",
	3: "Disconectando",
};

describe("Test Connection DB", () => {
	it.only("MongoDB Connection", async () => {
		async function isConnected(){
			
			const state = STATUS[db.readyState];
			if (state === "Conectado") return state;

			if (state !== "Conectando") return state;

			await new Promise(resolve => setTimeout(resolve, 1000));
			return STATUS[db.readyState];
		}
		const result = await isConnected();
		const expected = "Conectado";

		expect(result).toEqual(expected);

	});
});