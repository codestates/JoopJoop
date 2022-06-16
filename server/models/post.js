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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post_comment' }],

    // comments: [{
    //   text: String,
    //   author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user'
    //   }
    // }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
