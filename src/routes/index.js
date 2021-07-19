const express = require("express");
const router = express.Router();

const associateRouter = require("./associateRouter");
const customerRouter = require("./customerRouter");
const deliverymanRouter = require("./deliverymanRouter");
const deliveryRouter = require("./deliveryRouter");
const acpRouter = require("./acpRouter");
const reportRouter = require("./reportRouter");

router.get("/", (req, res) => {
    res.status(200).json({message: "Server is running."})
});

router.use("/associate", associateRouter);
router.use("/customer", customerRouter);
router.use("/deliveryman", deliverymanRouter);
router.use("/delivery", deliveryRouter);
router.use("/ACP", acpRouter);
router.use("/report", reportRouter);

module.exports = router;