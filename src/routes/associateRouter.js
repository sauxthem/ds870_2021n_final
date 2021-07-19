const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/authAssociate");

associateRouter.put("/updateAssociate/:id", auth, associateController.selfUpdateAssociate);
associateRouter.post("/login", associateController.authenticateAssociate);

module.exports = associateRouter;