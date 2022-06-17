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
router.put("/:id", async (req, res) => {
  try {
    const gathering = await Gathering.findById(req.params.id)
      .populate("author", ["nickname", "profileImg"])
      .populate("participants", ["nickname", "profileImg"]);
    // console.log(gathering.author._id.toString());
    if (gathering.author._id.toString() === req.body.author) {
      try {
        const updatedGathering = await Gathering.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        )
          .populate("author", ["nickname", "profileImg"])
          .populate("participants", ["nickname", "profileImg"]);
        res.status(200).json(updatedGathering);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "자신이 만든 모임만 수정할 수 있습니다" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE GATHERING
router.delete("/:id", async (req, res) => {
  try {
    const gathering = await Gathering.findById(req.params.id);
    if (gathering.author.nickname === req.body.nickname) {
      try {
        await gathering.delete();
        res.status(200).json({ message: "모임이 삭제 되었습니다." });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res
        .status(401)
        .json({ message: "자신이 만든 모임만 삭제할 수 있습니다" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET GATHERING
router.get("/:id", async (req, res) => {
  try {
    const gathering = await Gathering.findById(req.params.id)
      .populate("author", ["nickname", "profileImg"])
      .populate("participants", ["nickname", "profileImg"]);
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
      gatherings = await Gathering.find()
        .populate("author", ["nickname", "profileImg"])
        .populate("participants", ["nickname", "profileImg"]);
    }
    res.status(200).json(gatherings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Join(POST) GATHERING
router.post("/participation", async (req, res) => {
  console.log(req.body);
  try {
    const { gathering_id, participant_id } = req.body;
    const gathering_participanted = await Gathering.findById(gathering_id);

    // 파라미터로 입력받은 참가자의 id(participant_id)와 모임 참가자들의 id(participants)를 비교해서 일치하는 id가 있는지 확인
    const isduplication = participants => {
      for (let el of participants) {
        // console.log(el.toString());
        if (el.toString() === participant_id) {
          return true;
        }
      }
      return false;
    };

    if (!isduplication(gathering_participanted.participants)) {
      const user_gathering = await User.findByIdAndUpdate(participant_id, {
        $push: { gatherings: gathering_id },
      });

      const gathering_participant = await Gathering.findByIdAndUpdate(
        gathering_id,
        {
          $push: { participants: participant_id },
        },
      );
      return res.status(200).json({ message: "모임 참가가 완료됐습니다." });
    } else {
      return res.status(401).json({ message: "이미 참가한 모임입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Cancellation(POST) GATHERING
router.post("/cancellation", async (req, res) => {
  try {
    const { gathering_id, participant_id } = req.body;
    const gathering_participanted = await Gathering.findById(gathering_id);

    const isduplication = participants => {
      for (let el of participants) {
        // console.log(el.toString());
        if (el.toString() === participant_id) {
          return true;
        }
      }
      return false;
    };

    if (isduplication(gathering_participanted.participants)) {
      const user_gathering = await User.findByIdAndUpdate(participant_id, {
        $pull: { gatherings: gathering_id },
      });

      const gathering_participant = await Gathering.findByIdAndUpdate(
        gathering_id,
        {
          $pull: { participants: participant_id },
        },
      );
      return res
        .status(200)
        .json({ message: "모임 참가 취소가 완료됐습니다." });
    } else {
      return res.status(401).json({ message: "이미 참가 취소한 모임입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
