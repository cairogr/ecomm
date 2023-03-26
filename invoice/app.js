/* eslint-disable no-unused-vars */
const { Kafka } = require("kafkajs");
const {createInvoice} = require("./src/controller/InvoiceController.js");
const {processMessage} = require("./src/validations/validations.js");

const clientId = "ecomm";
const brokers = ["kafka:9092"];
const topic = "processInvoice";
const kafka = new Kafka({clientId,	brokers});

const consumer = kafka.consumer({ groupId: "create-Invoice" });
const producer = kafka.producer();

(async ()=>{
	await producer.connect();
	await consumer.connect();
	await consumer.subscribe({ topic: topic, fromBeginning: true });
	await consumer.run({
		eachMessage: (async ({ topic, partition, message }) => {
			try {
				const payload = await JSON.parse(message.value.toString());
				const validationPayload = await processMessage(payload);

				if (validationPayload.length!=0) {
					throw new Error(validationPayload);
				}

				const dataInvoice = await createInvoice(payload);

				await producer.send({
					topic: "Data-Invoices",
					messages: [{value: JSON.stringify(dataInvoice)}]
				});

				console.log({partition,
					offset: message.offset,
					value: message.value.toString()});
			} catch (e) {
				try {
					console.warn("Failed to process message, sending to DLQ", { topic, partition, offset: message.offset, error: e });

					await producer.send({
						topic: "DLQ_TOPIC",
						messages: [message]
					});
				} catch (e) {
					console.error("Failed to send message to dead letter queue", { error: e });
					throw e;
				}
			}
		})
	});
})();

