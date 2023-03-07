let accounts = [];

function createUserUseCase(name, email, password) {
	let userId = accounts.length + 1;
	if (accounts.every((account) => account.email !== email)){
		accounts.push({
			id: userId,
			name: name + " " + userId,
			email: email,
			password: password,
			createdDate: new Date().toLocaleString(),
		});
	}
	else{
		console.log("Usuário já cadastrado");
	}

	return accounts;
}

export { createUserUseCase, accounts };
