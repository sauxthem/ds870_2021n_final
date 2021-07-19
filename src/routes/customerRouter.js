const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");
const auth = require("../middlewares/authAssociate");

customerRouter.get("/", auth, customerController.listAllCustomers);
customerRouter.get("/listByCNPJ/:cnpj", auth, customerController.getCustomerByCNPJ);
customerRouter.post("/newCustomer", auth, customerController.newCustomer);
customerRouter.put("/updateCustomer/:id", auth, customerController.updateCustomer);
customerRouter.delete("/:id", auth, customerController.deleteCustomer);

module.exports = customerRouter;