module.exports = (sequelize, Sequelize) => {
  const Advertisement = sequelize.define("advertisement", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    ad_title: {
      type: Sequelize.STRING

    },

    ad_price: {
      type: Sequelize.STRING

    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', //table name 
        key: 'id'
      }
    }
  }, {
    tableName: "advertisements",
    timestamps: false,


  });

  return Advertisement;
};