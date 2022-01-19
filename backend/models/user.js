const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                // 이메일
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true,
            },
            password: {
                // 패스워드
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            ph_number: {
                // 휴대폰 번호
                type: Sequelize.STRING(45),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {}
};