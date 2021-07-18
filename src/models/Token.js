const Sequelize = require("sequelize");

class Token extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                token: Sequelize.STRING(255),
                expiration: Sequelize.DATE,
                deliverymanId: Sequelize.INTEGER,
                associateId: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: 'Token'
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Deliveryman, { foreignKey: "deliverymanId" });
        this.belongsTo(models.Associate, { foreignKey: "associateId" });
    }
}

module.exports = Token;