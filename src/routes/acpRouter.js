const express = require("express");
const acpRouter = express.Router();
const associateController = require("../controllers/associateController");

acpRouter.get("/", associateController.listAllAssociates);
acpRouter.get("/listByCNPJ/:cnpj", associateController.getAssociateByCNPJ);
acpRouter.post("/newAssociate", associateController.newAssociate);
acpRouter.put("/updateAssociate/:id", associateController.updateAssociate);
acpRouter.delete("/:id", associateController.deleteAssociate);

module.exports = acpRouter;