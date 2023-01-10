import { createUserUseCase, accounts } from "./createUserAccount.js";
import { createAdditionalDataUseCase } from "./createAdditionalData.js";

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
