import accounts from "./../models/accounts.js";

class AccountsController {
  static readAllAccounts = (req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.description = 'Lista todos usuários cadastrados.'
    accounts.find((err, accounts) => {
      res.status(200).json(accounts);
    });
    /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Accounts" },
        description: 'Sucesso!' 
    } */
  };
  static createAccounts = (req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.description = 'Cria uma conta de usuário.'
    /* #swagger.parameters['info'] = {
        in: 'body',
        required: true,
        schema: {
                    $name: 'Phone',
                    $status: true || false,
                }
    } */
    let account = new accounts(req.body);

    account.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar usuário.` });
        /* #swagger.responses[500] = { 
            description: 'Falha ao cadastrar usuário!' 
          } */
      } else {
        res.status(201).send(account.toJSON());
        /* #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/Accounts" },
            description: 'Criado com Sucesso!' 
          } */
      }
    });
  };

  static readAccountById = (req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.description = 'Lista detalhes de um usuário.'
    /* #swagger.parameters['id'] = { 
        description: 'ID do usuário.',
        in: 'path',
        type: Number
    }*/
    const id = req.params.id;

    accounts.findById(id, (err, accounts) => {
      if (err) {
        res
          .status(404)
          .send({ message: `${err.message} - Id do usuário não localizado.` });
        /* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Accounts" },
          description: 'Usuário não localizada!' 
        } */
      } else {
        res.status(200).send(accounts);
        /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Accounts" },
          description: 'Sucesso!' 
        } */
      }
    });
  };

  static updateAccount = (req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.description = 'Atualiza os dados do usuário.'
    /* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID do usuário que será atualizado',
        type: 'number'
    } */

    const id = req.params.id;

    accounts.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Usuário atualizado com sucesso" });
        /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Accounts" },
          description: 'Usuário atualizado com sucesso!' 
        } */
      } else {
        res.status(404).send({ message: err.message });
        /* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Accounts" },
          description: 'Usuário não encontrada!' 
        } */
      }
    });
  };

  static deleteAccount = (req, res) => {
    // #swagger.tags = ['Accounts']
    // #swagger.description = 'Deleta usuário.'
    /* #swagger.parameters['filtro'] = {
	      in: 'path',
        description: 'Digite o ID do usuário que será deletado',
        type: 'number'
    } */
    const id = req.params.id;

    accounts.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "Usuário removido com sucesso" });
        /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Accounts" },
          description: 'Usuário removido com Sucesso!' 
        } */
      } else {
        res.status(404).send({ message: err.message });
        /* #swagger.responses[404] = { 
          schema: { $ref: "#/definitions/Accounts" },
          description: 'Usuário não encontrada!' 
        } */
      }
    });
  };
}

export default AccountsController;
