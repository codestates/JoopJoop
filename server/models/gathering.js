const mongoose = require('mongoose');
const GatheringSchema = mongoose.Schema(
  {
    creator: {
      type: Object,
      required: true,
      properties: {
        nickname: String,
        profile_img: String,
      },
      // default: [{ nickname: 'MinHyuk', profile_img: 'MinHyuk.jpeg' }],
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
    participants: {
      // 채팅방 참가자들 id
      type: Array,
      properties: {
        nickname: String,
      },
    },
    // comment: {
    //   // 댓글단사람의 아이디, 댓글 내용
    //   type: Array,
    //   properties: {
    //     nickname: String,
    //     message: String,
    //   },
    // },
    longitude: String,
    latitude: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('gathering', GatheringSchema);
