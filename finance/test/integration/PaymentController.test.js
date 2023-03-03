const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/main.js');
const STATUS = require('../../src/utils/constantes.js');

let id;
describe('Payments Controller', () => {
	it('returns all payments', async () => {
		await request(app)
			.get('/v1/payments')
			.set('Accept', 'application/json')
			.expect('content-type', /json/)
			.expect(200);
	});
	
	it('Create a new payment - SUCCESS', async () => {
		const response = await request(app)
			.post('/v1/payments')
			.send({
				value: 1,
				nameOnCard: 'Teste',
				numberOnCard: '1111222233334444',
				cardExpiration: '2023-02',
				cvv: 725,
			});

		expect(response.status).toEqual(201);
		id = response.body.id;
		expect(response.body.status).toEqual('CRIADO');
	});

	it('Create a new payment - ERROR', async () => {
		const response = await request(app)
			.post('/v1/payments')
			.send({
				value: 0,
				nameOnCard: 'Te',
				numberOnCard: '1111222233334444',
				cardExpiration: '2023-02',
				cvv: 725,
			});

		expect(response.status).toEqual(400);
	});

	it('Detail payment by ID - SUCCESS', async () => {
		const response = await request(app)
			.get(`/v1/payments/${id}`)
			.set('Accept', 'application/json')
			.expect('content-type', /json/)
			.expect(200);
		expect(response.body.nameOnCard).toEqual('Teste');

	});
	it('Detail payment by ID - ERROR 404', async () => {
		let newId = id+99999;
		await request(app)
			.get(`/v1/payments/${newId}`)
			.set('Accept', 'application/json')
			.expect('content-type', /json/)
			.expect(404);

	});
	it('Detail payment by ID - ERROR 500', async () => {
		let newId = 'id';
		await request(app)
			.get(`/v1/payments/${newId}`)
			.set('Accept', 'application/json')
			.expect('content-type', /json/)
			.expect(500);

	});

	it('Confirm a payment - SUCCESS', async () => {
		const response = await request(app)
			.post(`/v1/payments/${id}/auth/confirmado`)
			.send({
				buyerName: 'Cairo Ribeiro',
				buyerCpf: '12345678912',
				buyerAddress: [{
					street: 'Av Teste, 137',
					complement: 'Perto de ',
					city: 'Montes Claros',
					state: 'MG',
					postal_code: '39401-014',
					country_code: 'BR'
				}],
				items: [{
					name: 'Notebook',
					quantity: '1',
					value: '6050.00'
				},{
					name: 'Phone',
					quantity: '1',
					value: '5000.00'
				}
				]
			})
			.set('Accept', 'application/json');
			//.expect('content-type', /json/);
		expect(response.status).toEqual(200);
		expect(response.body.status).toEqual(STATUS.CONFIRMADO);
	});

	it('Confirm a payment - ERROR UNPROCESSABLE ENTITY', async () => {
		const response = await request(app)
			.post(`/v1/payments/${id}/auth/confirmado`)
			.send({
				buyerName: 'Cairo Ribeiro',
				buyerCpf: '12345678912',
				buyerAddress: [{
					street: 'Av Teste, 137',
					complement: 'Perto de ',
					city: 'Montes Claros',
					state: 'MG',
					postal_code: '39401-014',
					country_code: 'BR'
				}],
				items: [{
					name: 'Notebook',
					quantity: '1',
					value: '6050.00'
				},{
					name: 'Phone',
					quantity: '1',
					value: '5000.00'
				}
				]
			})
			.set('Accept', 'application/json');
			//.expect('content-type', /json/);
		expect(response.status).toEqual(401);
	});

	it('Delete payment by ID - SUCCESS', async () => {
		await request(app)
			.delete(`/v1/payments/${id}`)
			.set('Accept', 'application/json')
			.expect(404);

	});

	it('Delete payment by ID - ERROR', async () => {
		let newId = id+999999;
		await request(app)
			.delete(`/v1/payments/${newId}`)
			.set('Accept', 'application/json')
			.expect(204);

	});
});