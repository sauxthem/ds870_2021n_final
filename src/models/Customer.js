const Sequelize = require("sequelize");

class Customer extends Sequelize.Model {
    static init(sequelize){
        super.init(
            {
                companyName: Sequelize.STRING,
                cnpj: Sequelize.STRING(14),
                address: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'Customers'
            }
        );
    }

    static associate(models){
        this.hasMany(models.Delivery, { foreignKey: "customerId", onDelete: "CASCADE", hooks: true });
    }
}

module.exports = Customer;