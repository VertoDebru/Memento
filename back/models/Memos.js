const mongoose = require('mongoose');

const memoSchema = mongoose.Schema({
  catId: { type: String, required: true },
  title: { type: String, required: true },
  memo: { type: String, required: true },
});

module.exports = mongoose.model('Memos', memoSchema);
