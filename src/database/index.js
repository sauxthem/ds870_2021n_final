const sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const conn = new sequelize(dbConfig)

module.exports = conn;