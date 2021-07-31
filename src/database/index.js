require('dotenv/config');

const mongoose = require('mongoose');

// mongoose.connect(process.env.CONNECTION_DB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://teste:daniel@localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB Connection OK.');
});

module.exports = mongoose;
