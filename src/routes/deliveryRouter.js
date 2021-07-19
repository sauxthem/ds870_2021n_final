const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const authDeliveryman = require("../middlewares/authDeliveryman");
const authAssociate = require("../middlewares/authAssociate");

deliveryRouter.get("/", authAssociate, deliveryController.listAllDeliverys);
deliveryRouter.get("/listByCPF/:cpf", authAssociate, deliveryController.getDeliveryByCPF);
deliveryRouter.post("/newDelivery", authAssociate, deliveryController.newDelivery);
deliveryRouter.put("/associate/updateDelivery/:id", authAssociate, deliveryController.updateDeliveryAssociate);
deliveryRouter.delete("/:id", authAssociate, deliveryController.deleteDelivery);

deliveryRouter.put("/deliveryman/updateDelivery/:id", authDeliveryman, deliveryController.updateDeliveryDeliveryman);
deliveryRouter.get("/listCompleted", authDeliveryman, deliveryController.listAllDeliverysCompleted);
deliveryRouter.get("/listPending", authDeliveryman, deliveryController.listAllDeliverysPending);

module.exports = deliveryRouter;