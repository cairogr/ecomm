import {
  createUserUseCase,
  accounts,
} from "../src/use-case/createUserAccount.js";

createUserUseCase(`Nome`, `nome1@dominio.com`, 123456);

console.log(accounts);
