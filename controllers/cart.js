const db = require("../models");
const Op = db.Sequelize.Op;
const Cart = db.carts;

var Sequelize = require('sequelize');
const { carts } = require("../models");
const { INTEGER } = require("sequelize");
const Product = db.products;
const User = db.users;


const viewproductsincart = function (req, res) {    



  Cart.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: User, 
        attributes: ['first_name', 'last_name']
      },
      {
        model: Product, 
        attributes: ['name', 'description']
      },

    ],

  })
    .then(data => {
      res.send({
        data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

};




const addproducttocart = async (req, res, callback) => {

  // Validate request
  if (!req.body.quantity || !req.body.product_id) {
    res.status(400).send({
      message: "error"
    });
    return;
  }



  const cart = {
    quantity: req.body.quantity,

    user_id: req.user.id,
    product_id: req.body.product_id

  };

  const q = await Product.findOne({ attributes: ['quantity'], where: { id: cart.product_id }, options: INTEGER })
  if (q.get('quantity') == 0) {
    res.send({ message: "product out of stock" })
    return;
  }


  const c = await Product.findOne({ attributes: ['price'], where: { id: cart.product_id }, options: INTEGER })


  cart.total_price = c.get('price') * cart.quantity;


  Cart.create(cart)
    .then(data => {
      Product.update({
          quantity:q.get('quantity')-cart.quantity},
          
          {where: {id: cart.product_id}}),
      res.send(
        {
          data
        });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order."
      });
    });

}


const deleteAllProductsInCart = function (req, res) {

 

  Cart.destroy({
    where: { user_id: req.user.id },
    truncate: false

  })

    .then(num => {
      res.send({
        message: `${num} products were deleted successfully!`
      });

    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Students"
      });
    });

};
const deleteproductfromcart = function (req, res) {

  const productid = req.query.product_id;

  var condition = productid ? { product_id: { [Op.like]: `${productid}` } } : null;
  Cart.destroy({
    where: condition, user_id: req.user.id
  })
    .then(num => {
      if (num > 1) {
        res.send({
          message: "product was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete product with product id=${productid} or product id =${productid}. Maybe product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting product with product id=" + productid
      });
    });
};

module.exports = {
  viewproductsincart: viewproductsincart,
  addproducttocart: addproducttocart,
  deleteproductfromcart: deleteproductfromcart,
  deleteAllProductsInCart: deleteAllProductsInCart,


};