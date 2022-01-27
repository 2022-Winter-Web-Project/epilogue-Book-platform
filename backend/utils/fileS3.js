require("dotenv").config("../.env");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const path = require("path");
const { File } = require("../models");

const awsS3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
});

module.exports.multerStorage = multer({
    storage: multerS3({
        s3: awsS3,
        bucket: process.env.AWS_S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read-write",
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            console.log(file.originalname);
            console.log(`images/${Date.now()}${path.basename(file.originalname)}`);
            cb(null, `images/${Date.now()}${path.basename(file.originalname)}`);
        },
    }),
});

module.exports.upload_S3 = async(model, files) => {
    console.log("---s3 모듈 진입---");
    let fileType, url, originalUrl;
    files.map(async(file) => {
        fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
        url = file.location;
        originalUrl = file.location;

        const uploaded_S3 = await File.create({
            file_type: fileType,
            original_url: originalUrl,
            url: url,
        });
        model = await model.addFile(uploaded);
    });

    return model;
};

module.exports.delete_S3 = async(model) => {
    let files = await model.getFiles();
    if (files) {
        Promise.all(
            files.map((file) => {
                file.destroy();
            })
        );
    }
};

// // module.exports = multerStorage
// // module.exports.upload = multer({ storage: multerStorage });


// const { File } = require("../models");
// const multer = require("multer");
// const path = require("path");
// const AWS = require("aws-sdk");
// const multerS3 = require("multer-s3");

// AWS.config.update({
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//     region: "ap-northeast-2",
// });
// const s3 = new AWS.S3();

// module.exports.fileMulter = multer({
//     storage: multerS3({
//         s3,
//         bucket: "epilogueaws",
//         key(req, file, cb) {
//             console.log(file.originalname);
//             const fileType =
//                 file.mimetype.split("/")[file.mimetype.split("/").length - 1];
//             if (fileType == "image") {
//                 console.log("imageFile upload.");
//                 cb(null, `images/${Date.now()}${path.basename(file.originalname)}`);
//             } else if (fileType == "video") {
//                 console.log("videoFile upload.");
//                 cb(null, `videos/${Date.now()}${path.basename(file.originalname)}`);
//             } else {
//                 console.log("documentFile upload.");
//                 cb(null, `documents/${Date.now()}${path.basename(file.originalname)}`);
//             }
//         },
//     }),
// });

// // 파일 업로드
// module.exports.upload = async(model, files) => {
//     let fileType, url, originalUrl;
//     files.map(async(file) => {
//         fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
//         if (fileType == "image") {
//             originalUrl = file.location;
//             url = originalUrl.replace(/\/images\//, "/thumb/");

//             console.log(originalUrl);
//             onsole.log(url);
//         } else {
//             url = file.location;
//             originalUrl = file.location;

//             console.log(originalUrl);
//             console.log(url);
//         }

//         const uploaded = await File.create({
//             file_type: fileType,
//             original_url: originalUrl,
//             url: url,
//         });
//         model = await model.addFile(uploaded);
//     });

//     return model;
// };

// // 파일 삭제
// module.exports.delete = async(model) => {
//     let files = await model.getFiles();
//     if (files) {
//         Promise.all(
//             files.map((file) => {
//                 file.destroy();
//             })
//         );
//     }
// };