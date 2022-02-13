const express = require("express");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User, Post } = require("../models");
const { isLoggedIn } = require("./middlewares");
const router = express.Router();

// 마이페이지에 판매중, 판매완료 정보를 가져오는 기능 추가해야함

router.get('/getBooks', isLoggedIn, async(req, res, next) => {
    try {
        const books = await Post.findAll({
            where: { id: req.user.id }
        });
        let ids = [];
        books.forEach((book) => {
            ids.push(book.post_id);
        });
        const files = await File.findAll({
            where: {
                post_id: {
                    [Op.in]: ids
                }
            }
        })
        const response = {
            ok: true,
            posts: books,
            files,
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/read", async(req, res, next) => {
    try {
        let userInfo = await User.findOne({
            attributes: ["email", "contact"],
            where: { id: req.user.id },
        });
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/delete", async(req, res, next) => {
    try {
        let userInfo = await User.destroy({
            where: { id: req.user.id },
        });
        console.log("회원 탈퇴");
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;