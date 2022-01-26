require("dotenv").config("../.env");

module.exports = {
    development: {
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PW_DEV,
        database: "sys",
        host: process.env.DB_HOST_DEV,
        dialect: "mysql",
        timezone: "+09:00",
    },
    test: {
        username: "user_dev",
        password: null,
        database: "database_winterapp",
        host: "127.0.0.1",
        dialect: "mysql",
        timezone: "+09:00",
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PW,
        database: "sys",
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        timezone: "+09:00",
    },
};