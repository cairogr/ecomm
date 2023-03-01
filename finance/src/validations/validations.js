exports.createValidation = function (newPaymentData) {
    
	const validationNameOnCard = /\b([A-Z][a-z]+[ ]*)+/;
	const validationNumberOnCard = /^([0-9]{16})$/;
	const validationCardExpiration = /^[0-9]{4}-(1[0-3]|0[1-9])$/;
	const validationCVV = /^[0-9]{3}$/;
	let countError = [];

	if (newPaymentData.value <= 0) countError.push('Enter a value greater than zero');

	if (newPaymentData.nameOnCard.length < 3 ||!validationNameOnCard.exec(newPaymentData.nameOnCard)) countError.push('Enter a valid name');

	if (!validationNumberOnCard.exec(newPaymentData.numberOnCard)) countError.push('Enter a valid card number');

	if (parseInt(newPaymentData.cardExpiration.slice(0, 4)) < 2023 || !validationCardExpiration.exec(newPaymentData.cardExpiration)) countError.push('Enter a valid expiration date');

	if (!validationCVV.exec(newPaymentData.cvv)) countError.push('Enter with a valid CVV card');

	return countError;
};

