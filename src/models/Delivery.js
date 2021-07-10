const Sequelize = require("sequelize");

class Delivery extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                description: Sequelize.STRING,
                status: Sequelize.STRING(10),
                value: Sequelize.FLOAT,
                deliverymanId: Sequelize.INTEGER,
                customerId: Sequelize.INTEGER,
                associateId: Sequelize.INTEGER,
            },
            {
                sequelize
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Deliveryman, { foreignKey: "deliverymanId" });
        this.belongsTo(models.Customer, { foreignKey: "customerId" });
        this.belongsTo(models.Associate, { foreignKey: "associateId" });
    }
}

module.exports = Delivery;