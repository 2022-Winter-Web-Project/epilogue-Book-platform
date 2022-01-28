require("dotenv").config("../.env");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const { File } = require("../models");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

module.exports.multerStorage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log(`images/${Date.now()}${path.basename(file.originalname)}`);
      cb(null, `images/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});

module.exports.upload_S3 = async (model, files) => {
  console.log("--S3 업로드 모듈 진입---");
  let fileType, url, originalUrl;
  files.map(async (file) => {
    fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
    url = file.location;
    originalUrl = file.location;

    const uploaded_S3 = await File.create({
      file_type: fileType,
      original_url: originalUrl,
      url: url,
    });
    model = await model.addFile(uploaded_S3);
  });

  return model;
};

module.exports.delete_S3 = async (model) => {
  let files = await model.getFiles();
  if (files) {
    Promise.all(
      files.map((file) => {
        file.destroy();
      })
    );
  }
};
