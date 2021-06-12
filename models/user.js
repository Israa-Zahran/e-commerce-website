module.exports = (sequelize, Sequelize) => {

  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      require: true
    },
    last_name: {
      type: Sequelize.STRING,
      require: true
    },
    mobile: {
      type: Sequelize.STRING,
      require: true,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      require: true,
      unique: true

    },
    password: {
      type: Sequelize.STRING,
      require: true
    },
    
     
    user_type: { 
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "customer",
      },
      can_add_admin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false,

      }



  }

    , {

      tableName: "users",
      timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)

    });



  return User;
};