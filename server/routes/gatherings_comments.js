const router = require('express').Router();
const User = require('../models/user');
const Gathering = require('../models/gathering');
const GaComment = require('../models/gathering_comment');

//CREATE GATHERING COMMENT
router.post('/', async (req, res) => {
  const newGaComment = new GaComment(req.body);
  try {
    const savedGaComment = await newGaComment.save();
    res.status(200).json(savedGaComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE GATHERING COMMENT
router.put('/:id', async (req, res) => {
  try {
    const gaComment = await GaComment.findById(req.params.id);
    if (gaComment.content.nickname === req.body.content.nickname) {
      try {
        const updatedGaComment = await GaComment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedGaComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('자신이 만든 댓글만 수정할 수 있습니다');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE GATHERING COMMENT
router.delete('/:id', async (req, res) => {
  try {
    const gaComment = await GaComment.findById(req.params.id);
    if (gaComment.content.nickname === req.body.nickname) {
      try {
        await gaComment.delete();
        res.status(200).json('댓글이 삭제 되었습니다.');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('자신이 만든 댓글만 삭제할 수 있습니다');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET GATHERING COMMENT
router.get('/:id', async (req, res) => {
  try {
    const gaComment = await GaComment.findById(req.params.id);
    res.status(200).json(gaComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL GATHERING COMMENT
router.get('/', async (req, res) => {
  const nickname = req.query.nickname;
  try {
    let gaComments;
    if (nickname) {
      gaComments = await GaComment.find({ nickname });
    } else {
      gaComments = await GaComment.find();
    }
    res.status(200).json(gaComments);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
