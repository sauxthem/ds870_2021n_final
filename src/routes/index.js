const express = require("express");
const router = express.Router();

const associateRouter = require("./associateRouter");
const customerRouter = require("./customerRouter");
const deliverymanRouter = require("./deliverymanRouter");
const deliveryRouter = require("./deliveryRouter");
const loginRouter = require("./loginRoute");

router.get("/", (req, res) => {
    res.status(200).json({message: "Server is running."})
});

router.use("/associate", associateRouter);
router.use("/customer", customerRouter);
router.use("/deliveryman", deliverymanRouter);
router.use("/delivery", deliveryRouter);
router.use("/login", loginRouter);

module.exports = router;