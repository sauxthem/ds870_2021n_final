'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Deliverymen",
      [
        {
          id: 1,
          name: "Flynn Ryder",
          cpf: "09038483090",
          password: "herHairGlows",
          phone: "+18434269274",
        },
        {
          id: 2,
          name: "Fix it Felix Jr.",
          cpf: "46863988003",
          password: "iCanFixIt",
          phone: "+13184267320",
        },
        {
          id: 3,
          name: "John Petrucci",
          cpf: "54924207047",
          password: "#Gl@sgowK!ss#",
          phone: "+12487553263",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Deliverymen", null, {});
  }
};
