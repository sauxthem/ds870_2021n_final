const express = require("express");
const reportRouter = express.Router();
const reportController = require("../controllers/reportController");
const auth = require("../middlewares/authAssociate");
const authDelivery = require("../middlewares/authDeliveryman");

reportRouter.get("/adminReport", auth, reportController.adminReport);
reportRouter.get("/financialDeliveryReport", authDelivery, reportController.financialDeliveryReport);
reportRouter.get("/financialReport", auth, reportController.financialReport);


module.exports = reportRouter;