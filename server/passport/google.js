const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:80/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      //   const user = {
      //       username: profile.displayName,
      //       avatar: profile.photos[0],
      //   };
      //   user.save();
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
