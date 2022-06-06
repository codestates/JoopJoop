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

// KAKAO LOGIN
router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
