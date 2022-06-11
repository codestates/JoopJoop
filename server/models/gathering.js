const mongoose = require('mongoose');
const GatheringSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      properties: {
        message: String,
        image: String,
      },
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    longitude: String,
    latitude: String,
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'gathering_comment' },
    ],
    paricipants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('gathering', GatheringSchema);
