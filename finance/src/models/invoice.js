"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoices.belongsTo(models.Payments,{
        foreignKey: 'paymentID'
      });

      Invoices.hasOne(models.Payments,{
        foreignKey: 'invoiceID'
      })
    }
  }
  Invoices.init(
    {
      //paymentID: DataTypes.INTEGER,
      buyerName: DataTypes.STRING,
      buyerCpf: DataTypes.STRING,
      buyerAddress: DataTypes.JSON,
      items: DataTypes.JSON      

    },
    {
      sequelize,
      modelName: "Invoices",
    }
  );
  return Invoices;
};
