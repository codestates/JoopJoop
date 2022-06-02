const mongoose = require('mongoose');
const PostCommentSchema = mongoose.Schema(
  {
    post_id: String,
    content: {
      // 채팅친 참가자 id, 채팅내용
      type: Object,
      properties: {
        email: String,
        profile_img: String,
        message: String,
      },
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('post_comment', PostCommentSchema);
