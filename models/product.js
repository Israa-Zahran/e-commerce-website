module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.UUIDV4(),
      autoIncrement: true

    },

    name: {
      type: Sequelize.STRING
    }
    ,
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DOUBLE
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    subcategory_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'subCategories', //table name 
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
    }, sale_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
  }, {
    tableName: "products",
    timestamps: false,
  }




  );

  return Product;
};
