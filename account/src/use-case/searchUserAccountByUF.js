import {  accounts } from "./createUserAccount.js";

function searchUserAccountByUFUseCase(UFFind) {
	const searchUF = accounts.filter((account) => account.UF === UFFind);
	if (searchUF != "") {
		return searchUF;
	}
	if (searchUF == "") {
		return "Não encontrado!";
	}
}

export { searchUserAccountByUFUseCase };
