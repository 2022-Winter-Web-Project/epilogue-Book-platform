const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const passport = require("passport");
const nodemailer = require("nodemailer");
const { User } = require("../models");
const router = express.Router();
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const authSMS = require("./authSMS");
const path = require("path");
const fs = require("fs");
const jwt = require("../utils/jwt");
const redisClient = require("../utils/redis");
// const html_index = require("../public/passwordIndex.html");

// 회원가입
router.post(
    "/joinMember",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        try {
            const encryptedPW = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                email: req.body.email,
                password: encryptedPW,
                contact: req.body.contact,
            });
            return res.status(200).json(user);
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
            req.login(user, (loginError) => {
                if (loginError) {
                    console.log("loginError!!");
                    console.error(loginError);
                    return next(loginError);
                }
                // const accessToken = jwt.sign(user);
                // const refreshToken = jwt.refresh();
                // redisClient.set(user.id, refreshToken);

                const message = "로그인 완료!";
                console.log(req.session);
                console.log(req.isAuthenticated());
                return res.status(200).send({
                    ok: true,
                    data: {
                        message,
                        // accessToken,
                        // refreshToken,
                    },
                });
                // res.redirect("/");
            });
        })(req, res, next);
    }
);
router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    console.log(req.isAuthenticated());
    res.redirect("/");
});

//  카카오 로그인
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));
router.get(
    "/kakao/callback",
    isNotLoggedIn,
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        console.log("카카오 로그인 성공!");
        res.redirect("/");
    }
);

// 이메일 중복확인
router.post(
    "/checkDuplicateEmail",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        try {
            let message = "";
            let responseStatus = true;
            const formEmail = req.body.email;
            const user = await User.findOne({
                where: { email: formEmail },
            });

            if (!user || user === null) {
                message = "사용가능한 이메일이에요!";
            } else if (user) {
                message = "이미 사용중인 이메일이에요!";
                responseStatus = false;
            }
            res.status(200).send({
                ok: responseStatus,
                data: {
                    message,
                },
            });
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    }
);

// 전화번호 중복확인
router.post(
    "/checkDuplicatePh",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        try {
            let message = "";
            let responseStatus = true;
            const formContact = req.body.contact;
            const user = await User.findOne({
                where: { contact: formContact },
            });

            if (!user || user === null) {
                message = "사용가능한 번호에요!";
            } else if (user) {
                message = "이미 사용중인 번호에요!";
                responseStatus = false;
            }
            res.status(200).send({
                ok: responseStatus,
                data: {
                    message,
                },
            });
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    }
);

// 회원가입 - 각 항목별 중복확인
router.post(
    "/checkDuplicate",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        try {
            let message = "";
            let responseStatus = true;
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
                    message = "모두 사용가능해요!";
                } else if (userContact && userContact.contact == formContact) {
                    message = "이미 사용중인 번호에요!";
                    responseStatus = false;
                }
            } else if (userEmail && userEmail.email == formEmail) {
                message = "이미 사용중인 이메일이에요!";
                responseStatus = false;
            }
            res.status(200).send({
                ok: responseStatus,
                data: {
                    message,
                },
            });
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
        const message = "인증번호가 전송되었습니다.";
        res.status(200).send({
            ok: true,
            data: {
                message,
            },
        });
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
        const message = "인증 코드 검증 성공!";
        res.status(200).send({
            ok: true,
            data: {
                message,
            },
        });
    } catch (error) {
        console.error("에러!");
        console.error(error);
        res.send(error);
    }
});

// 이메일 찾기 (휴대폰 인증)
router.post("/help/findEmail", multer().none(), async(req, res, next) => {
    console.log("auth/findPW => ", req.body);
    try {
        const userEmail = await User.findOne({
            attributes: ["email"],
            where: { contact: req.body.contact },
        });
        if (userEmail != null) {
            console.log("이메일을 찾았어요!");
            res.json(userEmail);
        }
        if (userEmail == null) {
            console.log("이메일을 찾지 못했어요.");
            res.json("이메일을 찾지 못했어요.");
        }
    } catch (error) {
        console.error("이메일을 찾지 못했어요.");
        console.error(error);
        res.send(error);
    }
});

// 비밀번호 찾기 & 재설정 인증과정 (휴대폰 인증)
router.post(
    "/help/findPW/ph",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        console.log("auth/help/findPW/ph => ", req.body);
    }
);

// 비밀번호 찾기 & 재설정 인증과정 (이메일 인증)
router.post(
    "/help/findPW/email",
    isNotLoggedIn,
    multer().none(),
    async(req, res, next) => {
        console.log("auth/help/findPW/email => ", req.body);
        try {
            // 입력한 정보의 일치여부 확인 (계정의 이메일과 번호)
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                    contact: req.body.contact,
                },
            });
            if (user == null) {
                const error = new Error(
                    "가입하지 않은 회원이거나 입력하신 정보가 올바르지 않습니다."
                );
                error.name = "NoUserDataError";
                error.message =
                    "가입하지 않은 회원이거나 입력하신 정보가 올바르지 않습니다.";
                res.status(404).send(error);
            }
            // 토큰 생성
            // const auth = await Auth.create(data);
            const crypto = require("crypto");
            const token = crypto.randomBytes(20).toString("hex");
            const tokenUrl = `http://localhost:3000/auth/help/resetPW/${token}`;

            // 메일에 포함될 html 불러오기 (에러있음)
            let htmlFile = "";
            fs.readFile(
                path.join(__dirname, "..", ".", "/nodePublic/passwordIndex.html"),
                (err, data) => {
                    if (err) {
                        return console.error(err);
                    }
                    // response.end(data, "utf-8");
                    htmlFile = data;
                }
            );
            // 메일 정보
            const mailConfig = {
                service: "Naver",
                host: "smtp.naver.com",
                port: 587,
                auth: {
                    user: process.env.NAVER_MAIL_EMAIL,
                    pass: process.env.NAVER_MAIL_PASSWORD,
                },
            };
            let message = {
                from: process.env.NAVER_MAIL_EMAIL,
                to: req.body.email,
                subject: "이메일 인증 요청 메일입니다.",
                html: `<div id="readFrame">
                <header>
        <div style="
          color: #222;
          width: 100%;
          max-width: 596px;
          min-width: 300px;
          display: block;
          margin: 0 auto;
          padding: 20px;
          box-sizing: border-box;
        ">
            <img width="187" height="50" alt="" src="https://user-images.githubusercontent.com/69189272/151184774-fe5c325b-a509-46b3-b7c1-828c6e927dd6.png" loading="lazy" />
            <hr style="
            margin-top: 16px;
            height: 4px;
            width: 100%;
            min-width: 183px;
            border: 0;
            background-color: #14adea;
            background-image: linear-gradient(to left, #14adea, #30f1a5);
          " />
        </div>
    </header>
                <div align="" style="">
                    <div align="" style="">
                        <div align="" style="">
                            <div style="color: #222; width: 100%">
                                <table align="center" style="
                            font-family: Apple SD Gothic Neo, sans-serif;
                            width: 100%;
                            max-width: 596px;
                            background: #fff;
                            font-size: 16px;
                            line-height: 26px;
                            margin: 0 auto;
                            table-layout: fixed;
                          " cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td width="20"></td>
                                            <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tbody>
                                                        <tr>
                                                            <td height="40"></td>
                                                        </tr>
                                                        <tr>
                                                            <td style="text-align: center">
                                                                <img alt="" src="https://ssl.pstatic.net/static/ncp/img/mail/icon/MailingIcon_06_Password.png" loading="lazy" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td height="25"></td>
                                                        </tr>
                                                        <tr>
                                                            <td style="
                                          font-size: 30px;
                                          line-height: 37px;
                                          text-align: center;
                                        ">
                                                                <span style="color: #14adea">비밀번호 재발급 </span
                                        >안내입니다.
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="40"></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        이 메일은 회원님의 비밀번호 재발급을 안내하기 위해
                                        발송된 메일입니다. <br />
                                        아래
                                        <span style="color: #14adea"
                                          >[비밀번호 재발급하기]</span
                                        >
                                        버튼을 클릭하여 재발급 페이지로 이동해 주세요.
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="20"></td>
                                    </tr>
                                    <tr>
                                      <td style="text-align: center">
                                        <a
                                          href=${tokenUrl}
                                          target="_blank"
                                          rel="noreferrer noopener"
                                          ><span
                                            style="
                                              display: inline-block;
                                              width: 335px;
                                              height: 44px;
                                              background-color: #14adea;
                                              text-decoration: none;
                                              line-height: 44px;
                                              color: #fff;
                                              font-size: 16px;
                                              font-weight: 500;
                                              border-radius: 2px;
                                            "
                                            >비밀번호 재발급하기</span
                                          ></a
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td width="20"></td>
                            </tr>
                            <tr>
                              <td width="100%" height="60" colspan="3"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <footer>
                  <div
                    style="
                      color: #222;
                      width: 100%;
                      padding: 20px 0;
                      box-sizing: border-box;
                      border-top: 1px solid #eee;
                      width: 100%;
                      max-width: 596px;
                      min-width: 300px;
                      margin: 0 auto;
                      margin-top: 60px;
                      padding: 20px;
                    "
                  >
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr>
                          <td>
                            <table
                              width="100%"
                              style="text-align: right"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="font-size: 12px; line-height: 15px"
                                    colspan="2"
                                  >
                                    <a
                                      style="
                                        color: #14adea;
                                        font-weight: 500;
                                        text-decoration: none;
                                      "
                                      href="/"
                                      rel="noreferrer noopener"
                                      target="_blank"
                                      >에필로그 북 플랫폼 바로가기</a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </footer>
                <table style="display: none">
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src="https://track.hermes.navercorp.com/received/v2/MjAyMjAxMjAwMDAwMDIxNzY5MDI7MTI7Mzk7c2Fuc2VuZzAxQG5hdmVyLmNvbQ==.gif"
                          width="0"
                          height="0"
                          border="0"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>`,
            };
            // 메일 전송
            let transporter = nodemailer.createTransport(mailConfig);
            transporter
                .sendMail(message)
                .then((info) => {
                    console.log(info);
                    res.send(info);
                })
                .catch((err) => {
                    console.error(err);
                    res.send(err);
                });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
);

// 비밀번호 재설정
router.post("/help/resetPW/:token", multer().none(), async(req, res) => {
    try {
        const auth = await Auth.findOne({
            where: {
                token: req.params.token,
                created_at: {
                    [Op.gt]: new Date(new Date() - 5 * 60 * 1000),
                },
            },
        });
        console.log(auth);
        const user = await User.findByPk(auth.email);
        const hash = await bcrypt.hash(req.body.newPW, 12);
        await user.update({
            password: hash,
        });
        console.log(user);
        res.json("인증 성공!");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;