const { Router } = require("express");
const PaymentsController = require("../controllers/PaymentsController.js");

const router = Router();

router
  .get("/v1/payments", PaymentsController.readAllPayment)
  .get("/v1/payments/:id", PaymentsController.readPaymentById)
  .post("/v1/payments", PaymentsController.createPayment)
  .patch("/v1/payments/:id", PaymentsController.updatePayment)
  .patch("/v1/payments/:id/auth/:status", PaymentsController.changeStatusPayment)
  .delete("/v1/payments/:id", PaymentsController.deletePayment);

module.exports = router;
