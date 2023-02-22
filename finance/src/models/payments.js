"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payments.hasOne(models.Invoices,{
        foreignKey: 'paymentID'
      });

      Payments.belongsTo(models.Invoices,{
        foreignKey: 'invoiceID'
      });
    }
  }
  Payments.init(
    {
      value: DataTypes.DECIMAL,
      nameOnCard: DataTypes.STRING,
      numberOnCard: DataTypes.STRING,
      cardExpiration: DataTypes.STRING,
      cvv: DataTypes.INTEGER,
      //invoiceID: DataTypes.INTEGER,
      status: DataTypes.STRING,
      links: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Payments",
    }
  );
  return Payments;
};
