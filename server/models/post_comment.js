const mongoose = require('mongoose');
const PostCommentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    post_id: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('post_comment', PostCommentSchema);
