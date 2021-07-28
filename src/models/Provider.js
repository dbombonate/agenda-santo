const mongoose = require('../database');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;
