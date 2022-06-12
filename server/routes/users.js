const User = require('../models/user');
const CryptoJS = require('crypto-js');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./tokenfunction');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const router = require('express').Router();

//UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'gatherings',
      model: 'gathering',
    });
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get('/', async (req, res) => {
  try {
    let users = await User.find().populate('gatherings', [
      'title',
      'place',
      'date',
      'time',
    ]);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
