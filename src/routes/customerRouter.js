const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");

customerRouter.get("/", customerController.listAllCustomers);
customerRouter.get("/listByCNPJ/:cnpj", customerController.getCustomerByCNPJ);
customerRouter.post("/newCustomer", customerController.newCustomer);
customerRouter.put("/updateCustomer/:id", customerController.updateCustomer);
customerRouter.delete("/:id", customerController.deleteCustomer);

module.exports = customerRouter;