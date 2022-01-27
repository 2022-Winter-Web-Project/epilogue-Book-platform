const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log("세션 저장됨");
        done(null, user.email); // session save
    });

    passport.deserializeUser((userEmail, done) => {
        User.findOne({ where: { email: userEmail } })
            .then((user) => done(null, user)) // req.user
            .catch((err) => done(err));
    });

    local();
    kakao();
};