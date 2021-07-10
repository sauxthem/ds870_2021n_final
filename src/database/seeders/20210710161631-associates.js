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
          password: "noBugsHere2021",
          address: "3965 Crim Lane, Yellow Springs, OH, 45387",
        },
        {
          id: 2,
          companyName: "Monsters Inc",
          cnpj: "42102984000161",
          password: "#wescarebecausewecare",
        },
        {
          id: 3,
          companyName: "Buy'n Large Limited",
          cnpj: "62007004000159",
          password: "moneymoneymoney",
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
