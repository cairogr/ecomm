'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.DECIMAL
      },
      nameOnCard: {
        type: Sequelize.STRING
      },
      numberOnCard: {
        type: Sequelize.STRING,
      },
      
      cardExpiration: {
        type: Sequelize.STRING
      },
      cvv: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
      },
      links: {
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
    await queryInterface.dropTable('Payments');
  }
};