import { describe, it } from "@jest/globals";
import request from "supertest";
import app from "../../main.js";

let id;

describe("GET /products", () => {
	it("returns all products", async () => {
		await request(app)
			.get("/products")
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);
	});



	it("creates a product", async () => {
		const response = await request(app)
			.post("/admin/products")
			.send({
				name: "Notebook Samsung",
				description: "Samsung Book Core i5-1135G7, 8G, 256GB SSD, Iris Xe, 15.6\"FHD, W11 Cinza",
				slug: "notebook-samsung",
				unitPrice: 3523,
				quantityStock: 1,
				idCategory: "63dad04c0b4ccb2f095508cd"
			})
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(201);

		// eslint-disable-next-line no-underscore-dangle
		id = response.body._id;
	});


	it("returns a product found by its id", async () => {
		await request(app)
			.get(`/products/${id}`)
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);
	});



	it("updates a product", async () => {
		await request(app)
			.put(`/admin/products/${id}`)
			.send({
				name: "Notebook Lenovo",
				description: "Lenovo Book Core i5-1135G7, 8G, 256GB SSD, Iris Xe, 15.6\"FHD, W11 Cinza",
				slug: "notebook-lenovo",
				unitPrice: 3523,
				quantityStock: 1,
				idCategory: "63dad04c0b4ccb2f095508cd"
			})
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);
	});

	it("deletes a product", async () => {
		await request(app)
			.delete(`/admin/products/${id}`)
			.set("Accept", "application/json")
			.expect(204);
	});
});