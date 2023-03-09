import { describe, it } from "@jest/globals";
import request from "supertest";
import app from "../../main.js";


let id;

describe("Test Categories", () => {
	it("returns all categories", async () => {
		const response = await request(app)
			.get("/categories")
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);

		console.log(response.body);
	});



	it("create a category", async () => {
		const response = await request(app)
			.post("/admin/categories")
			.send({
				name: "TESTE",
				status: true,
			})
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(201);
	
		// eslint-disable-next-line no-underscore-dangle
		id = response.body._id;
	});


	it("returns a category found by its id", async () => {
		await request(app)
			.get(`/categories/${id}`)
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);
	});



	it("updates a category", async () => {
		const response = await request(app)
			.put(`/admin/categories/${id}`)
			.send({
				name: "TESTE",
				status: false,
			})
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);

		console.log(response.body);
	});



	it("delete a category", async () => {
		await request(app)
			.delete(`/admin/categories/${id}`)
			.set("Accept", "application/json")
			.expect(204);
	});
});