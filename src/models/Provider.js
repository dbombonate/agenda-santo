const mongoose = require('../database');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;
