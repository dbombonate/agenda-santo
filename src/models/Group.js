const mongoose = require('../database');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
