const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser(function(userEmail, done) {
        User.findOne({ email: userEmail }, (err, result) => {
            done(null, result.email);
        });
    });
    // passport.deserializeUser((userEmail, done) => {
    //     User.findOne({ where: { email: userEmail } })
    //         .then((user) => done(null, user))
    //         .catch((err) => done(err));
    // });

    local();
};