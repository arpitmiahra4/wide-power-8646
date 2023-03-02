const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = mongoose.connect(process.env.MONGO_URL);

module.exports = connectDatabase;
