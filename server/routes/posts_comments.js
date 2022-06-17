const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const PoComment = require("../models/post_comment");

//CREATE POST COMMENT
router.post("/", async (req, res) => {
  const newPoComment = new PoComment(req.body);
  try {
    const savedPoComment = await newPoComment.save();
    res.status(200).json(savedPoComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST COMMENT
router.put("/:id", async (req, res) => {
  try {
    const poComment = await PoComment.findById(req.params.id);
    if (poComment.content.email === req.body.content.email) {
      try {
        const updatedPoComment = await PoComment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPoComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "자신이 만든 댓글만 수정할 수 있습니다" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST COMMENT
router.delete("/:id", async (req, res) => {
  try {
    const poComment = await PoComment.findById(req.params.id);
    if (poComment.content.email === req.body.email) {
      try {
        await poComment.delete();
        res.status(200).json({ message: "댓글이 삭제 되었습니다." });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "자신이 만든 댓글만 삭제할 수 있습니다" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST COMMENT
router.get("/:id", async (req, res) => {
  try {
    const poComment = await PoComment.findById(req.params.id);
    res.status(200).json(poComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POST COMMENT
router.get("/", async (req, res) => {
  const email = req.query.email;
  try {
    let poComments;
    if (email) {
      poComments = await PoComment.find({ email });
    } else {
      poComments = await PoComment.find().populate("author", [
        "nickname",
        "email",
      ]);
    }
    res.status(200).json(poComments);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
