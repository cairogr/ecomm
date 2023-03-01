import { changeUserNameUseCase } from "../src/use-case/changeUserName.js";
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

changeUserNameUseCase("nome6@dominio.com", "Cairo");
changeUserNameUseCase("nome5@dominio.com", "Carol");
changeUserNameUseCase("nome4@dominio.com", "Karina");
changeUserNameUseCase("nome3@dominio.com", "Gabriel");

console.log(accounts);
