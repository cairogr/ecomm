import express from "express";
import AccountsController from "./../controllers/accountsController.js";

const router = express.Router();

router
	.get("/admin/accounts", AccountsController.readAllAccounts)
	.get("/admin/accounts/:id", AccountsController.readAccountById)
	.post("/accounts", AccountsController.createAccounts)
	.put("/admin/accounts/:id", AccountsController.updateAccount)
	.delete("/admin/accounts/:id", AccountsController.deleteAccount);

export default router;
