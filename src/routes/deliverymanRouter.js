const express = require("express");
const deliverymanRouter = express.Router();
const deliverymanController = require("../controllers/deliverymanController");
const auth = require("../middlewares/auth");

deliverymanRouter.get("/", auth, deliverymanController.listAllDeliverymans);
deliverymanRouter.get("/listByCPF/:cpf", auth, deliverymanController.getDeliverymanByCPF);
deliverymanRouter.post("/newDeliveryman", auth, deliverymanController.newDeliveryman);
deliverymanRouter.put("/updateDeliveryman/:id", auth, deliverymanController.updateDeliveryman);
deliverymanRouter.delete("/:id", auth, deliverymanController.deleteDeliveryman);

module.exports = deliverymanRouter;