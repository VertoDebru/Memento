const mongoose = require('mongoose');

const catSchema = mongoose.Schema({
  nameId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('Categories', catSchema);
