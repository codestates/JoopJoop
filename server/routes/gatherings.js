const router = require("express").Router();
const User = require("../models/user");
const Gathering = require("../models/gathering");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./tokenfunction");

//CREATE GATHERING
router.post("/", async (req, res) => {
  const newGathering = new Gathering(req.body);
  try {
    const savedGathering = await newGathering.save();
    res.status(200).json(savedGathering);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE GATHERING
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const gathering = await Gathering.findById(req.params.id);
    if (gathering.creator.nickname === req.body.nickname) {
      try {
        const updatedGathering = await Gathering.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatedGathering);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("자신이 만든 모임만 수정할 수 있습니다");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE GATHERING
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const gathering = await Gathering.findById(req.params.id);
    if (gathering.creator.nickname === req.body.nickname) {
      try {
        await gathering.delete();
        res.status(200).json("모임이 삭제 되었습니다.");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("자신이 만든 모임만 삭제할 수 있습니다");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET GATHERING
router.get("/:id", async (req, res) => {
  try {
    const gathering = await Gathering.findById(req.params.id).populate(
      "author",
      ["nickname", "profileImg"],
    );
    res.status(200).json(gathering);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL GATHERING
router.get("/", async (req, res) => {
  const nickname = req.query.nickname;
  try {
    let gatherings;
    if (nickname) {
      gatherings = await Gathering.find({ nickname });
    } else {
      gatherings = await Gathering.find().populate("author", [
        "nickname",
        "profileImg",
      ]);
    }
    res.status(200).json(gatherings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
