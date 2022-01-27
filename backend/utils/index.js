const FileS3 = require("./fileS3");
const JWT = require("./jwt");
const REDIS = require("./redis");

const utils = {};
utils.FileS3 = FileS3;
utils.JWT = JWT;
utils.REDIS = REDIS;

module.exports = utils;