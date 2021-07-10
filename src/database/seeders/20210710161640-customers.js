'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Customers",
      [
        {
          id: 1,
          companyName: "Fortune Brands Global Plumbing Group",
          cnpj: "94628141000105",
          address: "1533 Pleasant Hill Road, West Palm Beach, FL, 33409",
        },
        {
          id: 2,
          companyName: "The Snuggly Duckling",
          cnpj: "55896869000158",
          address: "4555 Joseph Street, Milwaukee, WI, 53202",
        },
        {
          id: 3,
          companyName: "Litwak's Family Fun Center",
          cnpj: "15388732000178",
          address: "1027 Jerry Dove Drive, Greeleyville, SC, 29056",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Customers", null, {});
  }
};
