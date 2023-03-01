import { removeUserUseCase } from "../src/use-case/removeUserAccount.js";
import {
	createUserUseCase,
	accounts,
} from "../src/use-case/createUserAccount.js";

createUserUseCase("Nome", "nome1@dominio.com", 123456);
createUserUseCase("Nome", "nome2@dominio.com", 123456);
createUserUseCase("Nome", "nome3@dominio.com", 123456);
createUserUseCase("Nome", "nome4@dominio.com", 123456);
createUserUseCase("Nome", "nome5@dominio.com", 123456);
createUserUseCase("Nome", "nome6@dominio.com", 123456);
createUserUseCase("Nome", "nome7@dominio.com", 123456);
createUserUseCase("Nome", "nome7@dominio.com", 123456);

removeUserUseCase("nome7@dominio.com");
console.log(accounts);
