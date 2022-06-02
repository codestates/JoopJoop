const mongoose = require('mongoose');
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    // creator: {
    //   // 게시글을 올린 유저
    //   type: Object,
    //   properties: {
    //     id: Number,
    //     nickname: String,
    //     profile_img: String,
    //   },
    // },
    // title: {
    //   type: String,
    //   required: true,
    // },
    // content: {
    //   message: String,
    //   image: String,
    //   required: true,
    // },
    // like: {
    //   // 좋아요 누른사람의 아이디
    //   type: Array,
    //   properties: {
    //     id: Number,
    //   },
    // },
    // comment: {
    //   // 댓글단사람의 아이디, 댓글 내용
    //   type: Array, // [{아이디 메세지 이미지} {아이디 메세지 이미지} {아이디 메세지 이미지}]
    //   properties: {
    //     id: Number,
    //     message: String,
    //     image: String,
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
