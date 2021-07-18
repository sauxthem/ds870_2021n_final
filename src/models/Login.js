const Sequelize = require("sequelize");

class Login extends Sequelize.Model {
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
                tableName: 'Login'
            }
        );
    }

    static associate(models){
        this.belongsTo(models.Deliveryman, { foreignKey: "deliverymanId" });
        this.belongsTo(models.Associate, { foreignKey: "associateId" });
    }
}

module.exports = Login;