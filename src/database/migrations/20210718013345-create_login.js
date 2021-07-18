'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Login", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 255,
      },
      deliverymanId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Deliverymen", key: "id" },
        onDelete: "CASCADE",
      },
      associateId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "Associates", key: "id" },
        onDelete: "CASCADE",
      },
      expiration: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate : Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Login");
  }
};
