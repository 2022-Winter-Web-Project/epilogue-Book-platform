const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

module.exports = () => {
    passport.use(
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password",
                session: true,
                passReqToCallback: false, // express의 req객체에 접근 가능여부
            },
            async(userEmail, userPassword, done) => {
                try {
                    console.log("passport-로컬 내부 로직");
                    console.log(userEmail);
                    console.log(userPassword);
                    const existUser = await User.findOne({ where: { email: userEmail } });
                    if (existUser) {
                        const result = await bcrypt.compare(
                            userPassword,
                            existUser.password
                        );
                        if (result) {
                            return done(null, existUser);
                        } else {
                            var err = new Error("비밀번호가 일치하지 않습니다.");
                            err.name = "WrongPasswordError";
                            return done(null, false, {
                                message: "비밀번호가 일치하지 않습니다.",
                            });
                        }
                    } else {
                        const err = new Error("가입되지 않은 회원입니다.");
                        err.name = "NoUserError";
                        return done(null, false, { message: "가입되지 않은 회원입니다." });
                    }
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};