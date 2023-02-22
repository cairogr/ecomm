"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      paymentID: {
        type: Sequelize.INTEGER,
        references: { model: 'Payments', key: 'id'}
      },
      buyerName: {
        type: Sequelize.STRING
      },
      buyerCpf: {
        type: Sequelize.STRING
      },
      buyerAddress: {
        type: Sequelize.JSON
      },
        items: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Invoices");
  },
};
