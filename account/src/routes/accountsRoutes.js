import express from "express";
import AccountsController from "./../controllers/accountsController.js";
import { authLocal, authBearer } from "../middlewares/auth.js";

const router = express.Router();

router
	.post("/accounts/login", authLocal, AccountsController.login)
	.get("/admin/accounts", authBearer, AccountsController.readAllAccounts)

	.get("/admin/accounts/:id", AccountsController.readAccountById)
	//.post("/login", AccountsController.autentication)
	.post("/accounts", AccountsController.createAccounts)


	.put("/admin/accounts/:id", authBearer,AccountsController.updateAccount)
	.delete("/admin/accounts/:id", authBearer,AccountsController.deleteAccount);

export default router;
