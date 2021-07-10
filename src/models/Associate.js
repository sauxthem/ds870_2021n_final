const Sequelize = require("sequelize");

class Associate extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                companyName: Sequelize.STRING,
                cnpj: Sequelize.STRING(14),
                password: Sequelize.STRING(),
                address: Sequelize.STRING,
            },
            {
                sequelize
            }
        );
    }

    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "associateId", onDelete: "CASCADE", hooks: true });
    }
}

module.exports = Associate;