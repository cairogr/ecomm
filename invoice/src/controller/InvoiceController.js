const database = require("../models");

module.exports = {
	async createInvoice(clientData) {
		const dataInvoice = await database.Invoices.create(clientData);
		return dataInvoice;
	},
};
