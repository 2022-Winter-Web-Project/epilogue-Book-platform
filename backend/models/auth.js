const Sequelize = require("sequelize");

module.exports = class Auth extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            token: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            verifyCode: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            ttl: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Auth",
            tableName: "auths",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
};