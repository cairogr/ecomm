import { accounts, createUserUseCase } from "./createUserAccount.js";

function createAdditionalDataUseCase(
  searchEmail,
  newPlace,
  newNumber,
  newComplement,
  newDistrict,
  newZipCode,
  newCity,
  newUF
) {
  accounts[
    accounts.findIndex((account) => account.email === searchEmail)
  ].place = newPlace;
  accounts[
    accounts.findIndex((account) => account.email === searchEmail)
  ].number = newNumber;

  accounts[
    accounts.findIndex((account) => account.email === searchEmail)
  ].complement = newComplement;

  accounts[
    accounts.findIndex((account) => account.email === searchEmail)
  ].district = newDistrict;

  accounts[accounts.findIndex((account) => account.email === searchEmail)].cep =
    newZipCode;

  accounts[
    accounts.findIndex((account) => account.email === searchEmail)
  ].city = newCity;

  accounts[accounts.findIndex((account) => account.email === searchEmail)].UF =
    newUF;

  return accounts;
}

export { createAdditionalDataUseCase };
