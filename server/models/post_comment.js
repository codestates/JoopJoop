const mongoose = require('mongoose');
const PostCommentSchema = mongoose.Schema(
  {
<<<<<<< HEAD
    text: {
=======
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
    message: {
>>>>>>> Merge를 위한 Commit
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamp: true }
);

module.exports = mongoose.model('post_comment', PostCommentSchema);
