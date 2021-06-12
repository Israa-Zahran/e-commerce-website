module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("image", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },

        name: {
            type: Sequelize.STRING
        },

        size: {
            type: Sequelize.DOUBLE
        },

        height: {
            type: Sequelize.DOUBLE
        },
        width: {
            type: Sequelize.DOUBLE
        }, url: {
            type: Sequelize.STRING

        }
    }, {
        tableName: "images",
        timestamps: false,




    });

    return Image;
};