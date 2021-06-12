module.exports = (sequelize, Sequelize) => {
  const Sale = sequelize.define("sale", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true

    },
    start_time: {
      type: Sequelize.DATE
    }, end_time: {
      type: Sequelize.DATE
    },
    sale_amount: {
      type: Sequelize.DOUBLE
    },
    status:{
      type: Sequelize.BOOLEAN

    },




  }
    , {

      tableName: "sales",
      timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)

    });



  return Sale;
};

