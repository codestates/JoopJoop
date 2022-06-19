const KakaoStrategy = require("passport-kakao").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../models/user");
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_URL = process.env.KAKAO_URL;
dotenv.config();

passport.use(
  new KakaoStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      callbackURL: "http://localhost:5000/auth/kakao/callback", // local 사용할 때 사용되는 callbackURL
      // callbackURL: KAKAO_URL, // 배포시 사용되는 callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const exUser = await User.findOne({
          oAuthId: profile.id,
        });

        if (exUser) {
          done(null, exUser); // 로그인 인증 완료
        } else {
          // 가입되지 않는 유저면 회원가입 후 로그인을 시킨다
          const newUser = await new User({
            oAuthId: profile.id,
            nickname: profile.displayName,
          });
          await newUser.save();
          console.log(newUser);
          done(null, newUser); // 회원가입하고 로그인 인증 완료
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
