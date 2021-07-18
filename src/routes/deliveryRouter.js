const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");

deliveryRouter.get("/", auth, deliveryController.listAllDeliverys);
deliveryRouter.get("/listCompleted", auth, deliveryController.listAllDeliverysCompleted);
deliveryRouter.get("/listPending", auth, deliveryController.listAllDeliverysPending);
deliveryRouter.get("/listByCPF/:cpf", auth, deliveryController.getDeliveryByCPF);
deliveryRouter.post("/newDelivery", auth, deliveryController.newDelivery);
deliveryRouter.put("/updateDelivery/:id", auth, deliveryController.updateDelivery);
deliveryRouter.delete("/:id", auth, deliveryController.deleteDelivery);

module.exports = deliveryRouter;