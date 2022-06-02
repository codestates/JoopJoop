const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');

//CREATE POST
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put('/:id', async (req, res) => {
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
      res.status(401).json('자기 자신의 포스팅글만 수정할수 있습니다');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.email === req.body.email) {
      try {
        await post.delete();
        res.status(200).json('포스팅 글이 삭제 되었습니다.');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('자기 자신의 포스팅글만 삭제할 수 있습니다');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get('/', async (req, res) => {
  const email = req.query.email;
  const cateName = req.query.cate;
  try {
    let posts;
    if (email) {
      posts = await Post.find({ email }); // await Post.find({ email: email }) 이랑 같음
    } else if (cateName) {
      posts = await Post.find({
        categories: {
          $in: [cateName], // 안에 카테고리이름이 있으면 posts안에 추가
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
