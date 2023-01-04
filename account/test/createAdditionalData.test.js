import { createAdditionalDataUseCase } from "../src/use-case/createAdditionalData.js";
import {
  createUserUseCase,
  accounts,
} from "../src/use-case/createUserAccount.js";

createUserUseCase(`Nome`, `nome1@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome2@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome3@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome4@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome5@dominio.com`, 123456);
createUserUseCase(`Nome`, `nome6@dominio.com`, 123456);

createAdditionalDataUseCase("nome6@dominio.com", "Cairo");

console.log(accounts);
