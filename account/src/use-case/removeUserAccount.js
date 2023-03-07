import { accounts } from "../use-case/createUserAccount.js";

function removeUserUseCase(emailFind) {
	while (accounts.some((account) => account.email === emailFind)) {
		accounts.splice(
			accounts.findIndex((account) => account.email === emailFind),
			1
		);
	}

	return accounts;
}

export { removeUserUseCase };
