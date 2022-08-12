const mongoose = require('mongoose');
const ChatSchema = mongoose.Schema(
  {
    // 채팅친 참가자(author)의 id, nicknmae, profilimg를 user를 참조해서 populate해오기
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    // 채팅창에 입력한 메세지
    message: String,
    // 해당 채팅이 소속된 gathering의 id값만 가져옴 -> 참여하고 있는지 아닌지 판단, 이전채팅내역 불러오기위해서
    connected_gathering: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('chat', ChatSchema);