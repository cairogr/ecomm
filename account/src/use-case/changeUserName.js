import { accounts, createUserUseCase } from "./createUserAccount.js";
import { searchUserAccountByEmailUseCase } from "./searchUserAccountByEmail.js";

function changeUserNameUseCase(searchEmail, newName) {
  accounts[
    accounts.findIndex((account) => account.email === searchEmail)
  ].name = newName;

  return accounts;
}

export { changeUserNameUseCase };
