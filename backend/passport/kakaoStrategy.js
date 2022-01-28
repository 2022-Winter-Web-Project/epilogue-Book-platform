const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_REST_API,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId_kakao: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const randomPassword = Math.random().toString(36).slice(2);
            const randomContact = Math.random().toString(36).slice(2);
            const encryptedPW = await bcrypt.hash(randomPassword, 10);
            const newUser = await User.create({
              email: profile._json.kakao_account.email,
              snsId_kakao: profile.id,
              provider: "kakao",
              contact: 00011112222,
              password: encryptedPW,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
