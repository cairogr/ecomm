/* eslint-disable no-unused-vars */
const database = require('../models');
const { UNPROCESSABLE_ENTITY, STATUS } = require('../utils/constantes.js');
const { createValidation } = require('../validations/validations.js');
const { Kafka } = require('kafkajs');

const clientId = 'ecomm';
const brokers = ['kafka:9092'];
const topic = 'processInvoice';
const kafka = new Kafka({clientId,	brokers});
let newInvoice = {};
class PaymentsController {

	static async create(req, res) {
		const newPaymentData = req.body;
		newPaymentData.status = STATUS.CRIADO;
		
		const validationPayment = createValidation(newPaymentData);

		if (validationPayment != 0) {
			return res.status(400).json(validationPayment);
		}

		try {
			const newPayment = await database.Payments.create(newPaymentData);
			const newLinks = [
				{
					href: `http://localhost:3000/v1/payments/${newPayment.id}/`,
					rel: 'self',
					method: 'GET',
				},
				{
					rel: 'Cancelar',
					method: 'PATCH',
					href: `http://localhost:3000/v1/payments/${newPayment.id}/auth/cancelado`,
				},
				{
					rel: 'Confirmar',
					method: 'PATCH',
					href: `http://localhost:3000/v1/payments/${newPayment.id}/auth/confirmado`,
				},
			];
			newPayment.links = newLinks;

			return res
				.status(201)
				.location(`http://localhost:3000/payments/${newPayment.id}`)
				.json(newPayment);
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async readAll(req, res) {
		try {
			const findPayment = await database.Payments.findAll({
				attributes: { exclude: ['cvv', 'links'] },
			});
			return res.status(200).json(findPayment);
		} catch (error) {
			return res.status(404).json(error.message);
		}
	}

	static async readByID(req, res) {
		const { id } = req.params;
		try {
			const paymentByID = await findPaymentData(id);
			
			if (paymentByID) {
				return res.status(200).json(paymentByID);
			} else {
				return res
					.status(404)
					.json({ mensagem: `Payment ID: ${id}  not found!` });
			}
		} catch (error) {
			return res.status(500).json(error.message);
		}
	}

	static async updateStatus(req, res) {
		const { id, status } = req.params;
		const clientData = req.body;
		clientData.paymentID = id;
		const paymentsData = await findPaymentData(id);

		if (paymentsData.status.toUpperCase() != STATUS.CRIADO){
			return res.status(401).json(UNPROCESSABLE_ENTITY);
		}

		if (status.toUpperCase() === STATUS.CONFIRMADO) {
			try{	
				const producer = kafka.producer();
				await producer.connect();
				const consumer = kafka.consumer({ groupId: 'create-Invoice'  });
				await consumer.connect();

				await producer.send({
					topic: topic,
					messages: [{value: JSON.stringify(clientData)}
					],
				});

				await consumer.subscribe({ topic: 'Data-Invoices', fromBeginning: true });
				await new Promise(resolve => setTimeout(resolve, 1000));
				await consumer.run({
					eachMessage: (async ({ topic, partition, message }) => {
						try{
							newInvoice = await JSON.parse(message.value.toString());
						}
						catch(e){
							console.warn('Failed to process message, sending to DLQ', { topic, partition, offset: message.offset, error: e });
						}
					})
				});

				await database.sequelize.transaction(async function (t) {

					console.log(newInvoice.id);
					await database.Payments.update(
						{ status: status.toUpperCase() },
						{ where: { id: Number(id) }, t}
					);

					await database.Payments.update(
						{  invoiceID: newInvoice.id },
						{ where: { id: Number(id) }, t}
					);
					return res.status(200).json({ mensagem: `Payment ID: ${id} confirmed! - Invoice in processing` });
				});
			}catch(error){
				return res.status(400).json(error.message);
			}
		} else {
			try {
				await database.Payments.update(
					{ status: status.toUpperCase() },
					{ where: { id: id } }
				);
				const updatenewPaymentData = await findPaymentData(id);
				return res.status(200).json(updatenewPaymentData);
			} catch (error) {
				return res.status(400).json(error.message);
			}
		}
		
	}

	static async update(req, res) {
		const { id } = req.params;
		const { status } = req.body;

		const findPayment = await findPaymentData(id);

		if (findPayment.status.toUpperCase() === STATUS.CRIADO && (status.toUpperCase() === STATUS.CANCELADO || status.toUpperCase() === STATUS.CONFIRMADO)) {
			try {
				await database.Payments.update(
					{ status },
					{ where: { id: Number(id) } }
				);
				return res.status(200).json({
					mensagem: `Payment ID: ${id}  Payment Status: ${status}`,
				});
			} catch (error) {
				return res.status(400).json(error.message);
			}
		} else {
			return res.status(401).json(UNPROCESSABLE_ENTITY);
		}
	}

	static async delete(req, res) {
		const { id } = req.params;
		try {
			await database.Payments.destroy({ where: { id: Number(id) } });
			return res.status(204).json({ mensagem: `Payment ID: ${id}  removed!` });
		} catch {
			return res
				.status(404)
				.json({ mensagem: `Payment ID: ${id}  not found!` });
		}
	}
}

async function findPaymentData(params) {
	return await database.Payments.findOne({
		where: { id: Number(params) },
		attributes: { exclude: ['cvv'] },
	});
	
}

module.exports = PaymentsController;
