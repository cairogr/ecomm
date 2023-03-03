const { describe, test, expect } = require('@jest/globals');
const {createValidation } = require('../../src/validations/validations.js');

describe('Test the function validattion of create payment', () =>{
	test('All validations Success!',() =>{
		const dataPayments = {
			value: 1,
			nameOnCard: 'Teste',
			numberOnCard: '1111222233334444',
			cardExpiration: '2023-05',
			cvv: 725
		};
		expect(createValidation(dataPayments)).toEqual([]);

	});
	test('Validation Value',() =>{
		const dataPayments = {
			value: 0,
			nameOnCard: 'Teste',
			numberOnCard: '1111222233334444',
			cardExpiration: '2023-05',
			cvv: 725
		};
		expect(createValidation(dataPayments)).toEqual(['Enter a value greater than zero']);

	});
	test('Validation Name On Card',() =>{
		const dataPayments = {
			value: 1,
			nameOnCard: 'T',
			numberOnCard: '1111222233334444',
			cardExpiration: '2023-05',
			cvv: 725
		};
		expect(createValidation(dataPayments)).toEqual(['Enter a valid name']);

	});
	test('Validation Card Number',() =>{
		const dataPayments = {
			value: 1,
			nameOnCard: 'Teste',
			numberOnCard: '1233334444',
			cardExpiration: '2023-05',
			cvv: 725
		};
		expect(createValidation(dataPayments)).toEqual(['Enter a valid card number']);

	});
	test('Validation Card Expiration',() =>{
		const dataPayments = {
			value: 1,
			nameOnCard: 'Teste',
			numberOnCard: '1111222233334444',
			cardExpiration: '2018-02',
			cvv: 725
		};
		expect(createValidation(dataPayments)).toEqual(['Enter a valid expiration date']);

	});
	test('Validation CVV Card',() =>{
		const dataPayments = {
			value: 1,
			nameOnCard: 'Teste',
			numberOnCard: '1111222233334444',
			cardExpiration: '2023-05',
			cvv: 5
		};
		expect(createValidation(dataPayments)).toEqual(['Enter with a valid CVV card']);

	});
});