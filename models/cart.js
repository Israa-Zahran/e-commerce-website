module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true

    }, quantity: {
      type: Sequelize.INTEGER
    },

    total_price: {
      type: Sequelize.DOUBLE
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: "carts",
    timestamps: false,

  });

  return Cart;
};