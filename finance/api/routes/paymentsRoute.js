const { Router } = require ('express')
const PaymentsController = require('../controllers/PaymentsController.js')

const router = Router();

router
    .get("/payments", PaymentsController.readAllPayment)
    .get("/payments/:id", PaymentsController.readPaymentById)
    //.patch("/payments/:id", PaymentsController.changeStatusPayment)
    .post("/payments", PaymentsController.createPayment)
    .patch("/payments/:id/:status", PaymentsController.updatePayment)
    .delete("/payments/:id", PaymentsController.deletePayment)



module.exports = router