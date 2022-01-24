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
                allowNull: false,
            },
            contact: {
                // 휴대폰 번호
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            snsId_kakao: {
                // 카카오 아이디
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            provider: {
                // 계정 정보 (로컬 or 카카오)
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: "local",
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

    static associate(db) {
        // User - Post (1:n)
        db.User.hasMany(db.Post, {
            foreignKey: "writer_id",
            targetKey: "id",
        });
    }
};