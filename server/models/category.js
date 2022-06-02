const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', CategorySchema);
