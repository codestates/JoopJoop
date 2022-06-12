const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  oAuthId: String,
  nickname: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileImg: { type: String, default: 'joopjoop.png' },
  introduction: String,
<<<<<<< HEAD
  gatherings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'gathering' }],
=======
  gatherings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'gathering',
    },
  ],
>>>>>>> add google oauth
});

module.exports = mongoose.model('user', UserSchema);
