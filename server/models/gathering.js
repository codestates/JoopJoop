const mongoose = require('mongoose');
const GatheringSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('gathering', GatheringSchema);
