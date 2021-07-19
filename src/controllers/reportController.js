const Deliveryman = require("../models/Deliveryman");
const Associate = require("../models/Associate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");
const Delivery = require("../models/Delivery");
const sequelize = require("sequelize");

module.exports = {
    async adminReport (req, res) {
        try {
            const qtdCustomers = await Customer.count();
            const qtdDeliveryman = await Deliveryman.count();
            const qtdDeliveries = await Delivery.count();

            const topCustomers = await Delivery.findAll({
                attributes: ['customerId',[sequelize.literal('select count(customerId) from delivery group by customerId'), customerCount]],
                group: ['customerId'],
                where: {status: 'COMPLETED'},
                include: 'customerCount',
                order: ["customerCount", "ASC"],
                limit : 5
            });

            const topDeliveryman = await Delivery.findAll({
                group: ['deliverymanId'],
                attributes: ['deliverymanId', [sequelize.literal('select count(deliverymanId) from delivery group by deliverymanId'), countDeliveryMan]],
                where: {status: 'COMPLETED'},
                include: 'countDeliveryMan',
                order: ["countDeliveryMan", "ASC"],
                limit : 5
            });

            const deliveryCompleted =  await Delivery.count({
                where: {status: 'COMPLETED'}
            });
            const deliveryPending =  await Delivery.count({
                where: {status: 'PENDING'}
            });
            
            dc = (deliveryCompleted * 100) / qtdDeliveries;
            if (deliverys) {
                return res
                    .status(200)
                    .json({msg: "Administrative report" , qtdCustomers ,  qtdDeliveryman ,  qtdDeliveries , topCustomers , topDeliveryman , deliveryCompleted , deliveryPending});
            }
            else {
                return res
                    .status(404)
                    .json({msg: "It was not possible to generate this report"});
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error lin generate report " + error.message});
        }
    },

    async financialReport (req, res) {
        try {
            const value = await Delivery.sum('value');
            const valueToPay = value * 0.7;
            const valueToAssociate = value * 0.3;
            const realValue = parseFloat(value.toFixed(2));
            const realvalueToAssociate = parseFloat(valueToAssociate.toFixed(2));
            const realvalueToPay = parseFloat(valueToPay.toFixed(2));
            if (realValue && realvalueToPay) {
                return res
                    .status(200)
                    .json({msg: "Financial report" , realValue , realvalueToPay, realvalueToAssociate });
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error in calculate the financial delivery report: " + error.message});
        }
    },

    async financialDeliveryReport (req, res) {
        try {
            const value = await Delivery.sum('value');
            const valueToPay = value * 0.7;
            const realValue = parseFloat(value.toFixed(2));
            const realvalueToPay = parseFloat(valueToPay.toFixed(2));
            if (realValue && realvalueToPay) {
                return res
                    .status(200)
                    .json({msg: "Financial report" , realValue , realvalueToPay });
            }
        } catch ( error ) {
            return res
                .status(500)
                .json({msg: "There was an error in calculate the financial delivery report: " + error.message});
        }
    }
}