const sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Associate = require("../models/Associate");
const Customer = require("../models/Customer");
const Delivery = require("../models/Delivery");
const Deliveryman = require("../models/Deliveryman");

const conn = new sequelize(dbConfig)

Associate.init(conn);
Customer.init(conn);
Delivery.init(conn);
Deliveryman.init(conn);

Associate.associate(conn.models);
Customer.associate(conn.models);
Delivery.associate(conn.models);
Deliveryman.associate(conn.models);

module.exports = conn;