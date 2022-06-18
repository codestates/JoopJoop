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
      callbackURL: "http://localhost:5000/auth/kakao/callback", // joopjoop uri 사용시 KAKAO_URL 사용
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      try {
        const exUser = await User.findOne({
          oAuthId: profile.id,
        });
        // 이미 가입된 프로필이면 성공
        // console.log(exUser);
        if (exUser) {
          done(null, exUser); // 로그인 인증 완료
        } else {
          // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
          const newUser = await new User({
            oAuthId: profile.id,
            nickname: profile.displayName,
            profileImg: profile._json.properties.profile_image,
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
