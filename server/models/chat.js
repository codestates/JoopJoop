const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema(
  {
    id: Number,
    content: {
      // 채팅친 참가자 id, 채팅내용
      type: Array,
      properties: {
        nickname: String,
        profile_img: String,
        message: String,
      },
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('chat', ChatSchema);
