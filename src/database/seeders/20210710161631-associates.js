'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Associates",
      [
        {
          id: 1,
          companyName: "Cyberpunk Technologies Inc",
          cnpj: "94385627000151",
          password: "$2a$12$tyXSU6SWSSKYghsRdA0vSuUBl6u2HBUWGqDuc8zv8Ig..6kkZDZlu",
          address: "3965 Crim Lane, Yellow Springs, OH, 45387",
        },
        {
          id: 2,
          companyName: "Monsters Inc",
          cnpj: "42102984000161",
          password: "$2a$12$tyXSU6SWSSKYghsRdA0vSuUBl6u2HBUWGqDuc8zv8Ig..6kkZDZlu",
        },
        {
          id: 3,
          companyName: "Buy'n Large Limited",
          cnpj: "62007004000159",
          password: "$2a$12$tyXSU6SWSSKYghsRdA0vSuUBl6u2HBUWGqDuc8zv8Ig..6kkZDZlu",
          address: "3987 Glenview Drive, Corpus Christi, TX, 78476",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associates", null, {});
  }
};
