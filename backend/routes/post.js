const express = require("express");
const fs = require("fs");
const path = require("path");
const { Post, File } = require("../models");
const Sequelize = require("sequelize");
const multer = require("multer");
const { isLoggedIn } = require("./middlewares");
const Op = Sequelize.Op;

const router = express.Router();

fs.readdir("public/img", (error) => {
    if (error) {
        console.log("img 폴더 생성");
        fs.mkdirSync("public/img");
    }
});
const imgMulter = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "public/img/");
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/search", multer().none(), (req, res, next) => {
    const { keyword } = req.body;

    if (keyword.trim() == "") {
        return res.status(400).send({
            message: "검색어가 비어있습니다."
        });
    }
    const query = `%${keyword}%`;

    Post.findAll({
        attributes: ["id", "title", "price", "created_at"],
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.like]: query
                    }
                },
                {
                    author: {
                        [Op.like]: query
                    }
                },
                {
                    publisher: {
                        [Op.like]: query
                    }
                }
            ]
        }
    })
    .then((result) => {
        res.json(result);
    })
    .catch((error) => {
        console.error(error);
        next(error);
    });
});

router.get("/:id", multer().none(), (req, res, next) => {
    const postId = req.params.id;

    Post.find({
        where: { id: postId }
    })
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.error(error);
        next(error);
    });
});

router.post("/img", isLoggedIn, imgMulter.single("img"), (req, res, next) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

router.post("/upload", isLoggedIn, multer().none(), async(req, res, next) => {
    const { title, author, publisher, price, condition, description, is_selling, writer_id, url } = req.body;
    let post_id = null;

    await Post.create({
        title: title,
        author: author,
        publisher: publisher,
        price: price,
        condition: condition,
        description: description,
        is_selling: is_selling,
        writer_id: writer_id,
    })
    .then((result) => {
        console.log(result.dataValues);
        post_id = result.dataValues.id;
        console.log(post_id);
    })
    .catch((error) => {
        console.error(error);
        // next(error);

    });

    await File.create({
        file_type: "image",
        url: url,
        post_id: post_id,
    })
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((error) => {
        console.error(error);
        // next(error);
    })
});

module.exports = router;