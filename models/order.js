module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true

    }, status: {
      type: Sequelize.STRING
    },
    order_date: {
      type: Sequelize.DATE
    },order_price: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    tableName: "orders",
    timestamps: false,




  });

  return Order;
};