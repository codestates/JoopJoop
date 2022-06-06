const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    badge: String,
    point: Number,
    introduction: String,
    // gathering_info: {
    //   type: Array,
    //   properties: {
    //     id: Number,
    //     creator_id: Number,
    //     title: String,
    //     date: String,
    //     location: String,
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
