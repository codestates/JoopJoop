const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');

//UPDATE
router.put('/:id', async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } // 수정한 정보로 보내기
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('자기 자신의 아이디만 정보 수정이 가능합니다.');
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ email: user.email });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('회원탈퇴 성공하셨습니다.');
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json('유저를 찾을 수 없습니다.');
    }
  } else {
    res.status(401).json('자기 자신의 아이디만 회원탈퇴가 가능합니다.');
  }
});

//GET USER
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get('/', async (req, res) => {
  const email = req.query.email;
  try {
    let users;
    if (email) {
      users = await User.find({ email });
    } else {
      users = await User.find();
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
