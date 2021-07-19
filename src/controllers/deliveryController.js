const Delivery = require("../models/Delivery");
const Deliveryman = require("../models/Deliveryman");
const { Op } = require("sequelize");

module.exports = {

    async newDelivery(req, res) {
        let {
            description,
            customerId,
            deliverymanId
        } = req.body;

        if (description === undefined || customerId === undefined || isNaN(customerId)  || deliverymanId === undefined || isNaN(deliverymanId)) {
            return res
                .status(400)
                .json({msg: "You must inform a valid description, customerId and deliverymanId!"});
        }

        try {

            let newDelivery = await Delivery.create({
                description,
                customerId,
                deliverymanId
            });
            console.log("\nCreation successful - " + newDelivery.name + "\n");

            if (newDelivery) {
                return res
                    .status(201)
                    .json({msg: "New Delivery created successfully."});
            }
            else {
                return res
                    .status(500)
                    .json({msg: "It was not possible to create the new delivery."});
            }
        } catch (error) {
            return res
                .status(500)
                .json({msg: "There was an error while creating the Delivery: " + error});
        }
    },

    async listAllDeliverys(req, res) {
        try {
            const deliverys = await Delivery.findAll({
                order: [["id", "ASC"]]
            });

            if (deliverys) {
                return res
                    .status(200)
                    .json({deliverys});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to find the deliverys."});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error list deliverys: " + error.message});
        }
    },

    async listAllDeliverysPending(req, res) {
        try {
            const deliverys = await Delivery.findAll({
                where: {
                    [Op.and]: [
                        { status: 'PENDING' },
                        { deliverymanId: req.id }
                    ]
                },
                order: [["id", "ASC"]]
            });

            if (deliverys) {
                return res
                    .status(200)
                    .json({deliverys});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to find the deliverys."});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error list deliverys: " + error.message});
        }
    },

    async listAllDeliverysCompleted(req, res) {
        try {
            const deliverys = await Delivery.findAll({
                where: {
                    [Op.and]: [
                        { status: 'COMPLETED' },
                        { deliverymanId: req.id }
                    ]
                },
                order: [["id", "ASC"]]
            });

            if (deliverys) {
                return res
                    .status(200)
                    .json({deliverys});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to find the deliverys."});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error list deliverys: " + error.message});
        }
    },

    async getDeliveryByCPF(req, res) {
        let cpf = req.params.cpf;

        if (cpf === undefined || isNaN(cpf)) {
            return res
                .status(400)
                .json({msg: "You must inform a valid CNPJ (Only numbers)!"});
        }
        else {
            try {

                const deliveryman = await Deliveryman.findOne({
                    where: {cpf: cpf}
                });

                if (!deliveryman) {
                    return res
                        .status(404)
                        .json({msg: "No deliveryman were found."});
                }

                const delivery = await Delivery.findAll({
                    where: {deliverymanId: deliveryman.id}
                });

                if (delivery) {
                    return res
                        .status(200)
                        .json({delivery});
                }
                else {
                    return res
                        .status(404)
                        .json({msg: "No delivery were found."});
                }
            } catch (error) {
                return res
                    .status(500)
                    .json({msg: "There was an error get delivery: " + error.message});
            }
        }
    },

    async updateDeliveryAssociate(req, res) {
        const deliveryId = req.params.id;
        const delivery = req.body;

        if (deliveryId === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid ID!"});
        }
        else {
            const deliveryExists = await Delivery.findByPk(deliveryId);

            if (deliveryExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else {
                try {
                    if (delivery.description || delivery.customerId || isNaN(delivery.customerId)  || delivery.deliverymanId || isNaN(delivery.deliverymanId) || delivery.associateId || isNaN(delivery.associateId)) {
                        await Delivery.update(delivery, {
                            where: {id: deliveryId},
                        });
                        return res
                            .status(200)
                            .json({msg: "Delivery successfully updated!"});
                    }
                    else {
                        return res
                            .status(400)
                            .json({msg: "You must inform a description, customerId, deliverymanId and associateId!"});
                    }
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error update delivery: " + error.message});
                }
            }
        }
    },

    async updateDeliveryDeliveryman(req, res) {
        const deliveryId = req.params.id;
        const delivery = req.body;

        if (deliveryId === undefined) {
            return res
                .status(400)
                .json({msg: "You must inform a valid ID!"});
        }
        else if (!status && !value) {
            return res
                .status(400)
                .json({ msg: "You must inform a valid price and/or status!" });
        }
        else {
            const deliveryExists = await Delivery.findByPk(deliveryId);

            if (deliveryExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else {

                if(!deliveryExists.status === 'PENDING') {
                    return res
                        .status(404)
                        .json({msg: "The informed id doesn`t PENDING."});
                }

                try {
                    if (delivery.status || delivery.value) {
                        await Delivery.update(delivery, {
                            where: {id: deliveryId},
                        });
                        return res
                            .status(200)
                            .json({msg: "Delivery successfully updated!"});
                    }
                    else {
                        return res
                            .status(400)
                            .json({msg: "You must inform a description, customerId, deliverymanId and associateId!"});
                    }
                } catch (error) {
                    return res
                        .status(500)
                        .json({msg: "There was an error update delivery: " + error.message});
                }
            }
        }
    },

    async deleteDelivery(req, res) {
        const deliveryId = req.params.id;
        try {

            const deliveryExists = await Delivery.findByPk(deliveryId);

            if (deliveryExists === undefined) {
                return res
                    .status(404)
                    .json({msg: "The informed id doesn`t exists."});
            }
            else {
                if (!deliveryExists.status === 'PENDING') {
                    return res
                        .status(404)
                        .json({msg: "The informed id doesn`t PENDING."});
                }

                const deletedDelivery = await Delivery.destroy({
                    where: {id: deliveryId},
                });

                if (deletedDelivery !== 0) {
                    return res
                        .status(200)
                        .json({msg: "Delivery successfully deleted!"});
                }
            }

        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error delete delivery: " + error.message});
        }
    },
};