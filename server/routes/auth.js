const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPass,
      nickname: req.body.nickname,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json("유저를 찾을 수 없습니다.");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      res.status(400).json("비밀번호가 틀렸습니다.");
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  },
);

module.exports = router;
