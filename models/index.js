const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const db = {};
db.mongoose = mongoose;

db.user = require("./user.models")(mongoose)

db.role = require("./role.models")
db.url = dbConfig.url;
db.ROLES = ["student", "admin", "teacher"];

module.exports = db;