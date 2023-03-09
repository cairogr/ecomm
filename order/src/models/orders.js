"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Orders extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		// eslint-disable-next-line no-unused-vars
		static associate(models) {
			/**
     */
		}
	}
	Orders.init(
		{
			buyerID: DataTypes.INTEGER,
			status: DataTypes.STRING,
			paymentID: DataTypes.STRING,
			deliveryAddress: DataTypes.JSON,
			orderItems: DataTypes.JSON,
			links: DataTypes.JSON
		},
		{
			sequelize,
			modelName: "Orders",
		}
	);
	return Orders;
};
