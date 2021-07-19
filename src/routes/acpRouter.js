const express = require("express");
const acpRouter = express.Router();
const associateController = require("../controllers/associateController");

acpRouter.get("/associate/", associateController.listAllAssociates);
acpRouter.get("/associate/listByCNPJ/:cnpj", associateController.getAssociateByCNPJ);
acpRouter.post("/associate/newAssociate", associateController.newAssociate);
acpRouter.put("/associate/updateAssociate/:id", associateController.updateAssociate);
acpRouter.delete("/associate/:id", associateController.deleteAssociate);

module.exports = acpRouter;