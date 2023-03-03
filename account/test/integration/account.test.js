import { describe, it, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../../src/main.js";
import mongoose from "mongoose";

afterAll(done => {
	// Closing the DB connection allows Jest to exit successfully.
	mongoose.connection.close();
	done();
});

let id;
describe("Test Accounts", () => {
	it("returns all accounts", async () => {
		const response = await request(app)
			.get("/admin/accounts")
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);

		console.log(response.body);
	});



	it("create a account", async () => {
		const response = await request(app)
			.post("/accounts")
			.send({
				name: "Lawrence Fry",
				email: "lawrencefry@silodyne.com",
				password: "E@d8ad1135ea9",
				status: false,
				cpf: "18027099962",
				phone: "+559693282-4623",
				registered: "Tue Jan 17 2023 11:42:53 GMT-0300 (Brasilia Standard Time)",
				address: [
					{
						street: "Flatlands Avenue",
						number: 4150,
						complement: "",
						zipCode: "66.117-1",
						city: "Barclay",
						state: "RO",
						status: true
					}
				]
			})
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(201);
			
	
		// eslint-disable-next-line no-underscore-dangle
		id = response.body._id;
	});


	it("returns a account found by its id", async () => {
		await request(app)
			.get(`/admin/accounts/${id}`)
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);
	});



	it("updates a account", async () => {
		await request(app)
			.put(`/admin/accounts/${id}`)
			.send({
				name: "Lawrence Fry 2 2 2 2"
			})
			.set("Accept", "application/json")
			.expect("content-type", /json/)
			.expect(200);
	});



	it("delete a account", async () => {
		await request(app)
			.delete(`/admin/accounts/${id}`)
			.set("Accept", "application/json")
			.expect(204);
	});
});