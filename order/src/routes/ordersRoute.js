const { Router } = require("express");
const OrdersController = require("../controller/OrdersController");

const router = Router();

router
.post("/v1/orders", OrdersController.createOrder)
.post("/v1/orders/:id/:status", OrdersController.changeStatusOrder)

module.exports = router;
