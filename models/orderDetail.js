module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define("orderDetail", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true

    }, total_price: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },

    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    cart_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
 
      references: {
        model: 'carts',
        key: 'id'
      }
    },
  }, {
    tableName: "orderDetails",
    timestamps: false,



  });

  return OrderDetails;
};