'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Deliveries", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        length: 255,
      },
      status: {
        type: Sequelize.STRING,
        length: 10,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      deliverymanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Deliverymen", key: "id" },
        onDelete: "CASCADE",
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Customers", key: "id" },
        onDelete: "CASCADE",
      },
      associateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Associates", key: "id" },
        onDelete: "CASCADE",
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate : Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Deliveries");
  }
};
