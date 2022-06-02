const router = require('express').Router();
const Category = require('../models/category');

router.post('/', async (req, res) => {
  const newCate = new Category(req.body);
  try {
    const savedCate = await newCate.save();
    res.status(200).json(savedCate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const cates = await Category.find();
    res.status(200).json(cates);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
