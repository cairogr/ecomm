const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/main.js');
const STATUS = require('../../src/utils/constantes.js');

let id;
describe('Payments Controller', () => {
	it('returns all payments', async () => {
		const response = await request(app)
			.get('/v1/payments')
			.set('Accept', 'application/json')
			.expect('content-type', /json/)
			.expect(200);

		console.log(response.body);
	});
	
	it('Create a new payment', async () => {
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
		console.log(response.body.id);
		console.log(id);
		expect(response.body.status).toEqual('CRIADO');
	});

	it('Detail payment by ID', async () => {
		const response = await request(app)
			.get(`/v1/payments/${id}`)
			.set('Accept', 'application/json')
			.expect('content-type', /json/)
			.expect(200);

		expect(response.body.nameOnCard).toEqual('Teste');
		console.log(id);
	});

	it('Confirm a payment', async () => {
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
		console.log(response.body.id);
		console.log(STATUS.CONFIRMADO);
		expect(response.body.status).toEqual(STATUS.CONFIRMADO);
	});
});