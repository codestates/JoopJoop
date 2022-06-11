const mongoose = require('mongoose');

<<<<<<< HEAD
const UserSchema = new mongoose.Schema({
  oAuthId: String,
  nickname: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
=======
const UserSchema = new mongoose.Schema(
  {
    oAuthId: String,
    nickname: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    badge: String,
    point: Number,
    desc: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post_comment',
      },
    ],
>>>>>>> Merge를 위한 Commit
  },
  profileImg: { type: String, default: 'joopjoop.png' },
  introduction: String,
  gatherings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gathering' }],
  // badge: String,
  // point: Number,
  // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
  // postcomments: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'post_comment' },
  // ],
  // gatheringcomments: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'gathering_comment' },
  // ],
  // { timestamps: true }
});

module.exports = mongoose.model('user', UserSchema);
