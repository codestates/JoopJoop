const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  oAuthId: String,
  nickname: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileImg: { type: String, default: "/uploads/joopjoop.png" },
  introduction: String,
  gatherings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gathering",
    },
  ],
});

module.exports = mongoose.model("user", UserSchema);
