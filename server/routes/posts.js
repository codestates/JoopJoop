const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/post_comment');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./tokenfunction');

//CREATE POST
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  const author = new User({});
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//CREATE POST COMMENT /:id
//UPDATE POST COMMENT /:id
//DELETE POST COMMENT /:id

//UPDATE POST
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "자기 자신의 포스팅글만 수정할수 있습니다" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        await post.delete();
        res.status(200).json({ message: "포스팅 글이 삭제 되었습니다." });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "자기 자신의 포스팅글만 삭제할 수 있습니다" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments');
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    let comments = await Comment.find().populate('author', 'nickname');
    let posts = await Post.find()
      .populate('author', 'nickname')
      .populate('comments', ['author', 'text']);

    // console.log(comments);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
