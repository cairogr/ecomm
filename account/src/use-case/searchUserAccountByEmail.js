import { accounts } from "../use-case/createUserAccount.js";

function searchUserAccountByEmailUseCase(emailFind) {
	const searchEmail = accounts.filter((account) => account.email === emailFind);
	if (searchEmail != "") {
		return searchEmail;
	}
	if (searchEmail == "") {
		return "Não encontrado!";
	}
}

export { searchUserAccountByEmailUseCase };
