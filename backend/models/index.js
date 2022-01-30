var express = require("express");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const User = require("./user");
const Post = require("./post");
const File = require("./file");
const Auth = require("./auth");

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;
db.User = User;
db.Post = Post;
db.File = File;
db.Auth = Auth;

User.init(sequelize);
Post.init(sequelize);
File.init(sequelize);
Auth.init(sequelize);

User.associate(db);
Post.associate(db);
File.associate(db);

module.exports = db;