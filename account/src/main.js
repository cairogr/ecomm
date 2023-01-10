import { createUserUseCase, accounts } from "../src/use-case/createUserAccount.js";

createUserUseCase(`Nome`, `nome1@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome2@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome3@dominio.com`, 123456);

console.log(accounts);