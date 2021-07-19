const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/authAssociate");

associateRouter.get("/", auth, associateController.listAllAssociates);
associateRouter.get("/listByCNPJ/:cnpj", auth, associateController.getAssociateByCNPJ);
associateRouter.post("/newAssociate", auth, associateController.newAssociate);
associateRouter.put("/updateAssociate/:id", auth, associateController.updateAssociate);
associateRouter.delete("/:id", auth, associateController.deleteAssociate);
associateRouter.post("/login", associateController.authenticateAssociate);

module.exports = associateRouter;