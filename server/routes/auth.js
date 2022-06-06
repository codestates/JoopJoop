const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport = require('passport');

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    nickname: req.body.nickname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );

        !user && res.status(401).json("Wrong User email");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

router.post("/kakao", (req, res) => {
  if (req.body.data.oAuthId) {
    console.log(req.body.data.oAuthId);
    //요청 body에 oAuthId 키가 존재하는지 체크한다.
    //만일 존재한다면, DB에 해당 oAuthId를 갖고있는 유저를 탐색한다.
    User.findOne({ oAuthId: req.body.oAuthId }, (err, user) => {
      if (!user) {
        const userSchema = new User(req.body);
        // 계정 생성
        userSchema.save((err, _) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({
            registerSuccess: true,
          });
        });
      }
      //JWT 토큰 발급
      //! JWT 작성 완료 후 함수 교체 필요
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // save Token at Cookie
        res
          .cookie("x_auth", user.token) //쿠키에 JWT토큰을 넣어준다.
          .status(200)
          .json({ loginSuccess: true, userId: user._Id, token: user.token });
      });
    });
    return;
  } else {
    console.log("oAuthId not found!!");
    console.log(req);
  }
});

module.exports = router;
