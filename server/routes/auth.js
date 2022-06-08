const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const { generateToken, generateOauthToken } = require('./tokenfunction');

//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    nickname: req.body.nickname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  console.log(newUser);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json('등록되지않은 이메일입니다.');
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    // console.log(`original :" ${originalPassword} input :" ${inputPassword}`);

    if (originalPassword != inputPassword) {
      return res.status(401).json('패스워드를 다시 확인해주세요.');
    }

    const accessToken = generateToken(user);

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Oauth2 Kakao Login
router.post('/kakao', (req, res) => {
  if (req.body.data.oAuthId) {
    //요청 body에 oAuthId 키가 존재하는지 체크한다.
    //만일 존재한다면, DB에 해당 oAuthId를 갖고있는 유저를 탐색한다.
    User.findOne({ oAuthId: req.body.data.oAuthId }, (err, user) => {
      if (!user) {
        const userSchema = new User(req.body.data);
        // 계정 생성
        userSchema.save((err, _) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({
            registerSuccess: true,
          });
        });
      }
      //JWT 토큰 발급
      const accessToken = generateOauthToken(user);
      res
        .cookie('x_auth', accessToken)
        .status(200)
        .json({ loginSuccess: true, userId: user._id, token: accessToken });
    });
    return;
  } else {
  }
});

module.exports = router;
