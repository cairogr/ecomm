import { searchUserAccountByUFUseCase } from '../src/use-case/searchUserAccountByUF.js';
import { createUserUseCase, accounts } from '../src/use-case/createUserAccount.js';
import { createAdditionalDataUseCase } from "../src/use-case/createAdditionalData.js";

createUserUseCase(`Cairo`,`nome1@dominio.com`, 123456);
createUserUseCase(`Carol`,`nome2@dominio.com`, 123456);
createUserUseCase(`Karina`,`nome3@dominio.com`, 123456);
createUserUseCase(`Gabriel`,`nome4@dominio.com`, 123456);


createAdditionalDataUseCase(`nome1@dominio.com`, "rua", 210, "perto", "aqui", 39000, "Montes Claros", "MG");
createAdditionalDataUseCase(`nome3@dominio.com`, "rua", 230, "perto", "aqui", 39999, "Ouro Preto", "MG");



console.log(searchUserAccountByUFUseCase("MG"));
