require('dotenv/config');

const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_DB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
