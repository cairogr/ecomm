/* eslint-disable no-useless-escape */
module.exports = {
	async processMessage(message) {
		const validationName = /\b([A-Z][a-z]+[ ]*)+/;
		const validationCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

		let countError = [];

		if (message.buyerAddress.length == 0) countError.push("Address empty");

		if (message.items.length == 0) countError.push("Items empty");

		if (message.buyerName.length < 3 || !validationName.exec(message.buyerName))
			countError.push("Enter a valid name");

		if (!validationCpf.exec(message.buyerCpf))
			countError.push("Enter a valid CPF");

		return countError;
	},
};
