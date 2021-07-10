const express = require("express");
const app = express();

const router = require("./src/routes")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server running on port ", process.env.SYSTEM_PORT);
});

module.exports = app;