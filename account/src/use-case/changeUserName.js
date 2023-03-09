import { accounts} from "./createUserAccount.js";

function changeUserNameUseCase(searchEmail, newName) {
	accounts[
		accounts.findIndex((account) => account.email === searchEmail)
	].name = newName;

	return accounts;
}

export { changeUserNameUseCase };
