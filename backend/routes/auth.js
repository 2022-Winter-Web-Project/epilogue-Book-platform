const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const passport = require("passport");
const { User } = require("../models");
const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const authSMS = require("./authSMS");

// 회원가입
router.post(
    "/joinMember",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        console.log("auth/joinMember => ", req.body);
        try {
            // const existUser = await User.findOne({
            //     where: { email: req.body.email },
            // });
            // if (existUser) {
            //     return res.redirect("/join?error=exist");
            // }
            const encryptedPW = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                email: req.body.email,
                password: encryptedPW,
                contact: req.body.contact,
            });
            console.log("회원가입 성공!");
            return res.json(user);
        } catch (error) {
            console.error(error);
            return next(error);
        }
    }
);

// 로그인 & 로그아웃
router.post(
    "/login",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        console.log("auth/login => ", req.body);
        // res.json("success!");
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                console.log("로그인 오류!");
                console.error(err);
                return next(err);
            }
            if (!user) {
                console.log("user 정보 없음!");
                return res.status(401).send(info);
            }
            return req.login(user, (loginError) => {
                if (loginError) {
                    console.log("loginError!!");
                    console.error(loginError);
                    return next(loginError);
                }
                console.log("로그인 성공!");
                return res.json(user);
            });
        })(req, res, next);
    }
);
// 아직 오류 존재
router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy(() => {
        //클라이언트 측 세션 암호화 쿠키 삭제
        res.cookie("connect.sid", "", { maxAge: 0 });
        res.redirect("/");
    });
    console.log("로그아웃 성공!");
    res.json({ status: "logout" });
});

// 회원가입 - 각 항목별 중복확인
router.post(
    "/checkDuplicate",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        try {
            console.log(req.body);
            const message = "";
            const formEmail = req.body.email;
            const formContact = req.body.contact;
            const userEmail = await User.findOne({
                attributes: ["email"],
                where: { email: formEmail },
            });
            const userContact = await User.findOne({
                attributes: ["contact"],
                where: { contact: formContact },
            });

            if (!userEmail) {
                if (!userContact) {
                    console.log("모두 사용 가능!");
                    message = "모두 사용가능해요!";
                } else if (userContact && userContact.contact == formContact) {
                    console.log("이미 사용중인 번호입니다.");
                    message = "이미 사용중인 번호에요!";
                }
            } else if (userEmail && userEmail.email == formEmail) {
                console.log("이미 사용중인 이메일입니다.");
                message = "이미 사용중인 이메일이에요!";
            }
            res.json(message);
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    }
);

// 휴대폰인증 (NCP SENS)
router.post("/sendSMS", multer().none(), async(req, res, next) => {
    console.log("auth/sendSMS => ", req.body);
    try {
        await authSMS.sendSMS(req);
        console.log("인증 문자메시지 전송 성공!");
        return res.send("인증 문자메시지 전송 성공!");
    } catch (error) {
        console.error("에러!");
        console.error(error);
        res.send(error);
    }
});

// 인증 코드 검증 (모듈 미완성)
router.post("/verifySMS", multer().none(), async(req, res, next) => {
    console.log("auth/verifySMS => ", req.body);
    try {
        await authSMS.verifySMS(req);
        console.log("인증 코드 검증 성공!");
        return res.send("인증 코드 검증 성공!");
    } catch (error) {
        console.error("에러!");
        console.error(error);
        res.send(error);
    }
});

module.exports = router;