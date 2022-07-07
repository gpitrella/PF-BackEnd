const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const loginWithGoogle = require('./src/controllers/loginWithGoogle.js');

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await loginWithGoogle(profile);
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
