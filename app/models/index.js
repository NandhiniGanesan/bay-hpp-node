const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.doctor = require("./doctor.model.js")(mongoose);
db.appointments = require("./appointment.model.js")(mongoose);

module.exports = db;
