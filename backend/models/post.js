const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                // 게시글 제목
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            author: {
                // 작가
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            publisher: {
                // 출판사
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            price: {
                // 판매가격
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            condition: {
                // 책 상태
                // 1 : 최하 , 2 : 하 , 3 : 중 , 4 : 상 , 5 : 최상
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                // 설명
                type: Sequelize.TEXT,
                allowNull: false,
            },
            is_selling: {
                // 판매여부
                // 0 : 판매중 , 1 : 판매완료
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            writer_id: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Post",
            tableName: "posts",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {
        // Post - User (n:1)
        db.Post.belongsTo(db.User, {
            foreignKey: "writer_id",
            targetKey: "id",
        });

        // Post - File (1:n)
        db.Post.hasMany(db.File, {
            foreignKey: "post_id",
            sourceKey: "id",
        });
    }
};