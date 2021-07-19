const Customer = require("../models/Customer");

module.exports = {
    async newCustomer(req, res) {
        let {
            companyName,
            cnpj,
            address
        } = req.body;

        if (companyName === undefined || cnpj === undefined || address === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid companyName, cnpj and address!"});
        }

        try {
            let customer = await Customer.findOne({
                where: {cnpj: cnpj}
            });

            if (customer) {
                return res
                    .status(400)
                    .json({ msg: "The informed CNPJ is already registered!"});
            }
        }
        catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Associate: " + error});
        }

        try {

            let newCustomer = await Customer.create({
                companyName,
                cnpj,
                address,
            });
            console.log("\nCreation successful - " + newCustomer.name + "\n");

            if (newCustomer) {
                return res
                    .status(201)
                    .json({msg: "New Customer created successfully."});
            }
            else {
                return res
                    .status(500)
                    .json({msg: "It was not possible to create the new customer."});
            }
        } catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Customer: " + error});
        }
    },

    async listAllCustomers(req, res) {
        try {
            const customers = await Customer.findAll({
                order: [["id", "ASC"]]
            });

            if (customers) {
                return res
                    .status(200)
                    .json({customers});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to find the customers."});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error list customers: " + error.message});
        }
    },

    async getCustomerByCNPJ(req, res) {
        let cnpj = req.params.cnpj;

        if (cnpj === undefined || isNaN(cnpj)) {
            return res
                .status(400)
                .json({msg: "You must inform a valid CNPJ (Only numbers)!"});
        }
        else {
            try {
                const customer = await Customer.findOne({
                    where: {cnpj: cnpj}
                });

                if (customer) {
                    return res
                        .status(200)
                        .json({customer});
                }
                else {
                    return res
                        .status(404)
                        .json({msg: "No customer were found."});
                }
            } catch (error) {
                return res
                    .status(500)
                    .json({msg: "There was an error get customer: " + error.message});
            }
        }
    },

    async updateCustomer(req, res) {
        const customerId = req.params.id;
        const customer = req.body;
        if (customerId === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid ID!"});
        }
        else {
            const customerExists = await Customer.findByPk(customerId);
            if (customerExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else {
                try {
                    if (customer.companyName || customer.address || customer.cnpj) {
                        await Customer.update(customer, {
                            where: {id: customerId},
                        });
                        return res
                            .status(200)
                            .json({msg: "Customer successfully updated!"});
                    }
                    else {
                        return res
                            .status(400)
                            .json({msg: "You must inform a companyName, cnpj and address!"});
                    }
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error update customer: " + error.message});
                }
            }
        }
    },

    async deleteCustomer(req, res) {
        const customerId = req.params.id;
        try {
            const deletedCustomer = await Customer.destroy({
                where: {id: customerId},
            });

            if (deletedCustomer !== 0) {
                return res
                    .status(200)
                    .json({msg: "Customer successfully deleted!"});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "Customer not found."});
            }

        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error delete customer: " + error.message});
        }
    },
};