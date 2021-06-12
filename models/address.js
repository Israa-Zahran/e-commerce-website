module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      require:true
    },
    city: {
      type: Sequelize.STRING,
      require:true
    },
    street1: {
      type: Sequelize.STRING,
      require:true
    },
    street2: {
      type: Sequelize.STRING,
      require:true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', //table name 
        key: 'id'
      }
    }
  }, {
    tableName: "addresses",
    timestamps: false,


  });

  return Address;
};