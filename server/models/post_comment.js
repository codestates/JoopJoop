const mongoose = require('mongoose');
const PostCommentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamp: true }
);

module.exports = mongoose.model('post_comment', PostCommentSchema);
