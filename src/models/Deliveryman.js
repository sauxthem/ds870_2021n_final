const Sequelize = require("sequelize");

class Deliveryman extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                cpf: Sequelize.STRING(11),
                password: Sequelize.STRING,
                phone: Sequelize.STRING(15)
            },
            {
                sequelize
            }
        );
    }

    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "deliverymanId" });
    }
}

module.exports = Deliveryman;