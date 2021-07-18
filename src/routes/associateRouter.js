const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");

associateRouter.get("/", associateController.listAllAssociates);
associateRouter.get("/listByCNPJ/:cnpj", associateController.getAssociateByCNPJ);
associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.put("/updateAssociate/:id", associateController.updateAssociate);
associateRouter.delete("/:id", associateController.deleteAssociate);

module.exports = associateRouter;