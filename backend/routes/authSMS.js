require("dotenv").config("../.env");
const CryptoJS = require("crypto-js");
const Cache = require("memory-cache");
const axios = require("axios");
const { User, Auth } = require("../models");

// Naver Cloud Platform의 SENS 서비스를 활용한 인증 문자 전송
exports.sendSMS = function(req, res) {
    // api signature 만들기
    console.log("auth/sendSMS 내부 모듈 sendSMS 로직 => ", req.body);
    const user_phone_number = req.body.contact;
    // 계정 찾기
    const user = User.findOne({
        where: { contact: user_phone_number },
    });
    // ncp sens & other
    const ncp_access_key = process.env.NCP_ACCESS_KEY;
    const ncp_secret_key = process.env.NCP_SECRET_KEY;
    const ncp_sens_service_id = process.env.NCP_SENS_SERVICE_id;
    const ncp_sens_service_secretKey = process.env.NCP_SENS_SERVICE_SECRET_KEY;
    const content_type = "POST";
    const space = " ";
    const newLine = "\n";
    const timestamp = Date.now().toString();
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${ncp_sens_service_id}/messages`;
    const url2 = `/sms/v2/services/${ncp_sens_service_id}/messages`;
    // Crypto process 시작
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, ncp_secret_key);
    hmac.update(content_type);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(ncp_access_key);
    const hash = hmac.finalize();
    // api signature
    const ncp_api_signature = hash.toString(CryptoJS.enc.Base64);

    //인증번호 생성
    const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

    // SMS 전송
    axios({
            method: content_type,
            json: true,
            url: url,
            headers: {
                "Content-Type": "application/json",
                "x-ncp-iam-access-key": ncp_access_key,
                "x-ncp-apigw-timestamp": timestamp,
                "x-ncp-apigw-signature-v2": ncp_api_signature,
            },
            data: {
                type: "SMS",
                contentType: "COMM",
                countryCode: "82",
                from: process.env.SENS_PH,
                content: `[epilogue | 에필로그] 인증번호 [${verifyCode}]를 입력해주세요.`,
                messages: [{
                    to: `${user_phone_number}`,
                }, ],
            },
        })
        .then(async(res) => {
            console.log("httpStatus => ", res.status);
            console.log("verifyCode => ", verifyCode);
            await Auth.create({
                user_id: user.id,
                verifyCode,
                ttl: 180,
            });
            return res;
        })
        .catch((err) => {
            Cache.del(user_phone_number);
            console.error("axios 모듈 에러!");
            console.error(err.response.data);
        });
};

// 인증 코드 검증 (미완성)
exports.verifySMS = async function(req, res) {
    const user_phone_number = req.body.contact;
    const verifyCode = req.body.verifyCode;

    const authData = Auth.findOne({
        where: {
            contact: user_phone_number,
            created_at: {
                [Op.gt]: new Date().now - 300,
            },
        },
    });
    let message = "";
    if (!authData) {
        message = "인증 번호를 다시 요청해주세요.";
        res.status(404).send({
            ok: false,
            data: {
                message,
            },
        });
    }
    if (verifyCode !== authData.verifyCode) {
        message = "입력한 인증 번호를 다시 확인하세요.";
        res.status(401).send({
            ok: false,
            data: {
                message,
            },
        });
    }
    if (verifyCode === authData.verifyCode) {
        return res;
    }
};