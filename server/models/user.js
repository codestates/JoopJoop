const mongoose = require('mongoose');

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
    introduction: String,
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    // postcomments: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: 'post_comment' },
    // ],
    // gatherings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gathering' }],
    // gatheringcomments: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: 'gathering_comment' },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
