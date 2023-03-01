const db = require("../models");
const URL_DB_PRODUCTS = "http://localhost:3003/products";
const URL_DB_ACCOUNTS = "http://localhost:3003/accounts";


class OrdersController {
  static async createOrder(req, res) {
    const newOrderData = req.body;
    newOrderData.status = "REALIZADO";
    newOrderData.links = [
      {
        href: `http://localhost:3005/v1/orders/${newOrderData.id}/`,
        rel: "self",
        method: "GET",
      },
      {
        rel: "Cancelado",
        method: "POST",
        href: `http://localhost:3005/v1/orders/${newOrderData.id}/auth/cancelado`,
      },
      {
        rel: "PAGO",
        method: "POST",
        href: `http://localhost:3005/v1/orders/${newOrderData.id}/auth/pago`,
      },
    ];
    try {
      const findOrder =  await db.Orders.create(newOrderData);
      return res
        .status(201)
        .location(`http://localhost:3000/payments/${newOrderData.id}`)
        .json(findOrder);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async readAllOrders(req, res) {
    try {
      const findOrders = await db.Orders.findAll();
      return res.status(200).json(findOrders);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async readOrderByID(req, res) {
    const { id } = req.params;
    try {
      const findOrderByID = await db.Orders.findOne({
        where: { id: Number(id) },
      });
      if (findOrderByID != null) {
        return res.status(200).json(findOrderByID);
      } else {
        return res
          .status(404)
          .json({ mensagem: `Payment ID: ${id}  not found!` });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async changeStatusOrder(req, res) {
    const { id, status } = req.params;
    const orderData = req.body;


    let productData = await fetch(`http://localhost:3003/products/${orderData.buyerID}`)
    .then(response => response.json())
    .catch(console.error);

    let accountsData = await fetch(`http://localhost:3002/admin/accounts/${id}`)
    .then(response => response.json())
    .catch(console.error);

    const findOrder = await db.Orders.findOne({
      where: { id: id }
    });

    if (
      findOrder.status.toUpperCase() == "REALIZADO" &&
      (status.toUpperCase() == "CANCELADO" ||
        status.toUpperCase() == "PAGO")
    ) {
      if (status.toUpperCase() == "PAGO") {
        clientData.paymentID = "salvar id aqui";

        await db.Orders.update(
          { status: status.toUpperCase(),
          paymentID: "dasdasdsdsa",
          
        },
          { where: { id: id } }
        );
        const findStatusOrder = await db.Orders.findOne({
          where: { id: id }
        });
        return res.status(200).json(findStatusOrder);
      } else {
        try {
          await db.Orders.update(
            { status: status.toUpperCase() },
            { where: { id: id } }
          );
          const updateOrder = await db.Orders.findOne({
            where: { id: id }
          });
          return res.status(200).json(updateOrder);
        } catch (error) {
          return res.status(400).json(error.message);
        }
      }
    } else {
      return res.status(401).json({mensagem: "Você fez coisa errada, volta e faz de novo."});
    }
  }


}

module.exports = OrdersController;
