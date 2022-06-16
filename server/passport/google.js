const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../models/user");
const user = require("../models/user");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const {
        _json: { id, displayName },
      } = profile;

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
            // providerType: 'google',
          });
          await newUser.save();
          // console.log(newUser);
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
