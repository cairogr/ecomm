const { Router } = require("express");
const OrdersController = require("../controller/OrdersController");
const authBearer = require("../middlewares/auth.js");

const router = Router();

router
	.post("/v1/orders", authBearer, OrdersController.createOrder)
	.get("/v1/orders", authBearer, OrdersController.readAllOrders)
	.get("/v1/orders/:id", authBearer, OrdersController.readOrderByID)
	.post("/v1/orders/:id/:status", authBearer, OrdersController.changeStatusOrder);

module.exports = router;
