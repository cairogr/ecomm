const { Router } = require('express');
const PaymentsController = require('../controllers/PaymentsController.js');

const router = Router();

router
	.post('/v1/payments', PaymentsController.create)
	.get('/v1/payments', PaymentsController.readAll)
	.get('/v1/payments/:id', PaymentsController.readByID)
	.patch('/v1/payments/:id', PaymentsController.update)
	.patch('/v1/payments/:id/auth/:status', PaymentsController.updateStatus)
	.delete('/v1/payments/:id', PaymentsController.delete);

module.exports = router;
