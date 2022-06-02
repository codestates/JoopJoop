const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    profile_img: {
      type: String,
      default: '',
    },
    // badge: String,
    // point: Number,
    // introduction: String,
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
