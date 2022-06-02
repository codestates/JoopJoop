const mongoose = require('mongoose');
const GatheringCommentSchema = mongoose.Schema(
  {
    gathering_id: String,
    content: {
      // 채팅친 참가자 id, 채팅내용
      type: Object,
      properties: {
        nickname: String,
        profile_img: String,
        message: String,
      },
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('gathering_comment', GatheringCommentSchema);
