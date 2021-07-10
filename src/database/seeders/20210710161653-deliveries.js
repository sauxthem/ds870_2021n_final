'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Deliveries",
      [
        {
            id: 1,
            description: "Le ol' keg of beer",
            status: "PENDING",
            value: 0,
            deliverymanId: 1,
            customerId: 2,
            associateId: 2
        },
        {
          id: 2,
          description: "Sugar Rush arcade game controller",
          status: "PENDING",
          deliverymanId: 2,
          customerId: 3,
          associateId: 1
        },
        {
          id: 3,
          description: "Aromatherapy Shower Capsules",
          status: "PENDING",
          deliverymanId: 3,
          customerId: 1,
          associateId: 3
        },
        {
          id: 4,
          description: "Electronic circuit components",
          status: "COMPLETED",
          value: 12.5,
          deliverymanId: 1,
          customerId: 3,
          associateId: 1
        },
        {
          id: 5,
          description: "Kitchen Faucet",
          status: "COMPLETED",
          value: 11,
          deliverymanId: 2,
          customerId: 1,
          associateId: 2
        },
        {
          id: 6,
          description: "Suspiciously Dangerous Liquor",
          status: "COMPLETED",
          value: 22.74,
          deliverymanId: 3,
          customerId: 2,
          associateId: 3
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliveries", null, {});
  }
};
