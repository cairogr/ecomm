const database = require("../models");
const shortid = require("shortid");

const UNPROCESSABLE_ENTITY = {
  name: "UNPROCESSABLE_ENTITY",
  message:
    "The requested action could not be performed, semantically incorrect, or failed business validation."
};

class PaymentsController {
  static async createPayment(req, res) {
    const newPaymentData = req.body;
    newPaymentData.id =
      Math.floor(Date.now() * Math.random())
        .toString(36)
        .toUpperCase() +
      Math.floor(Date.now() * Math.random())
        .toString(36)
        .toUpperCase();
    newPaymentData.status = "CRIADO";
    newPaymentData.links = [
      {
        href: `http://localhost:3000/v1/payments/${newPaymentData.id}/`,
        rel: "self",
        method: "GET",
      },
      {
        rel: "Cancelar",
        method: "PATCH",
        href: `http://localhost:3000/v1/payments/${newPaymentData.id}/auth/cancelado`,
      },
      {
        rel: "Confirmar",
        method: "PATCH",
        href: `http://localhost:3000/v1/payments/${newPaymentData.id}/auth/confirmado`,
      },
    ];

    const validationNameOnCard = /\b([A-Z][a-z]+[ ]*)+/;
    const validationNumberOnCard = /^([0-9]{16})$/;
    const validationCardExpiration = /^[0-9]{4}-(1[0-3]|0[1-9])$/;
    const validationCVV = /^[0-9]{3}$/;
    let countError = [];

    if (newPaymentData.value <= 0) {
      countError.push("Enter a value greater than zero");
    }

    if (
      newPaymentData.nameOnCard.length < 3 ||
      !validationNameOnCard.exec(newPaymentData.nameOnCard)
    ) {
      countError.push("Enter a valid name");
    }

    if (!validationNumberOnCard.exec(newPaymentData.numberOnCard)) {
      countError.push("Enter a valid card number");
    }

    if (
      parseInt(newPaymentData.cardExpiration.slice(0, 4)) < 2023 ||
      !validationCardExpiration.exec(newPaymentData.cardExpiration)
    ) {
      countError.push("Enter a valid expiration date");
    }

    if (!validationCVV.exec(newPaymentData.cvv)) {
      countError.push("Enter with a valid CVV card");
    }

    if (countError.length == 0) {
      try {
        await database.Payment.create(newPaymentData);
        const findPayment = await database.Payment.findOne({
          where: { id: newPaymentData.id },
          attributes: { exclude: ["cvv"] },
        });
        return res
          .status(201)
          .location(`http://localhost:3000/payments/${newPaymentData.id}`)
          .json(findPayment);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } else {
      return res.status(400).json(countError);
    }
  }

  static async readAllPayment(req, res) {
    try {
      const findPayment = await database.Payment.findAll({
        attributes: { exclude: ["cvv", "links"] },
      });
      return res.status(200).json(findPayment);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async readPaymentById(req, res) {
    const { id } = req.params;
    try {
      const findPaymentByID = await database.Payment.findOne({
        where: { id: id },
        attributes: { exclude: ["cvv"] },
      });
      if (findPaymentByID != null) {
        return res.status(200).json(findPaymentByID);
      } else {
        return res
          .status(404)
          .json({ mensagem: `Payment ID: ${id}  not found!` });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async changeStatusPayment(req, res) {
    const { id, status } = req.params;
    const clientData = req.body;

    const findPayment = await database.Payment.findOne({
      where: { id: id },
    });

    if (
      findPayment.status.toUpperCase() == "CRIADO" &&
      (status.toUpperCase() == "CANCELADO" ||
        status.toUpperCase() == "CONFIRMADO")
    ) {
      if (status.toUpperCase() == "CONFIRMADO") {
        clientData.paymentID = id;

        await database.Invoice.create(clientData);

        const findInvoice = await database.Invoice.findOne({
          where: { paymentID: id },
        });

        await database.Payment.update(
          { status: status.toUpperCase(), invoiceID: findInvoice.id },
          { where: { id: id } }
        );

        return res.status(200).json(findInvoice);
      } else {
        try {
          await database.Payment.update(
            { status: status.toUpperCase() },
            { where: { id: id } }
          );
          const updatenewPaymentData = await database.Payment.findOne({
            where: { id: id },
            attributes: { exclude: ["links"] },
          });
          return res.status(200).json(updatenewPaymentData);
        } catch (error) {
          return res.status(400).json(error.message);
        }
      }
    } else {
      return res.status(401).json(UNPROCESSABLE_ENTITY);
    }
  }

  static async updatePayment(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const findPayment = await database.Payment.findOne({
      where: { id: id },
    });

    if (
      findPayment.status.toUpperCase() == "CRIADO" &&
      (status.toUpperCase() == "CANCELADO" ||
        status.toUpperCase() == "CONFIRMADO")
    ) {
      try {
        await database.Payment.update(
          { status },
          { where: { id: Number(id) } }
        );
        return res.status(200).json({
          mensagem: `Payment ID: ${id}  Payment Status: ${status}`,
        });
      } catch (error) {
        return res.status(400).json(error.message);
      }
    } else {
      return res.status(401).json(UNPROCESSABLE_ENTITY);
    }
  }

  static async deletePayment(req, res) {
    const { id } = req.params;
    try {
      await database.Payment.destroy({ where: { id: id } });
      return res.status(200).json({ mensagem: `Payment ID: ${id}  removed!` });
    } catch {
      return res
        .status(404)
        .json({ mensagem: `Payment ID: ${id}  not found!` });
    }
  }
}

module.exports = PaymentsController;
