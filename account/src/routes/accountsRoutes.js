import express from "express";
import AccountsController from "./../controllers/accountsController.js";
import { authLocal, authBearer } from "../middlewares/auth.js";

const router = express.Router();

router
	.post("/accounts/login", authLocal, AccountsController.login)
	.get("/admin/accounts", AccountsController.readAllAccounts)
	.get("/accounts/logout", authBearer, AccountsController.logout)

	.get("/admin/accounts/:id", AccountsController.readAccountById)
	.post("/accounts", AccountsController.createAccounts)

	.put("/admin/accounts/:id",AccountsController.updateAccount)
	.delete("/admin/accounts/:id",AccountsController.deleteAccount);

export default router;
