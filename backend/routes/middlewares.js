exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = "로그인한 상태입니다!";
        // res.redirect(`/?error=${message}`);
        // res.json(message);
        res.status(200).send({
            ok: false,
            data: {
                message,
            },
        });
    }
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        const message = "이미 로그아웃되었습니다.";
        res.status(403).send({
            ok: false,
            data: {
                message,
            },
        });
    }
};