import { searchUserAccountByEmailUseCase } from "../src/use-case/searchUserAccountByEmail.js";
import { createUserUseCase}  from "../src/use-case/createUserAccount.js";

createUserUseCase("Nome", "nome1@dominio.com", 123456);
createUserUseCase("Nome", "nome2@dominio.com", 123456);
createUserUseCase("Nome", "nome3@dominio.com", 123456);
createUserUseCase("Nome", "nome4@dominio.com", 123456);
createUserUseCase("Nome", "nome5@dominio.com", 123456);
createUserUseCase("Nome", "nome6@dominio.com", 123456);

console.log(searchUserAccountByEmailUseCase("nome30@dominio.com"));
