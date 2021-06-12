const db = require("../models");
const orderDetail = require("../models/orderDetail");
const Op = db.Sequelize.Op;
const Cart = db.carts;
const Product = db.products;
const OrderDetails = db.orderDetails;
const User = db.users;
const Order = db.orders;

const getOrders = function(req, res, next) {
	Order
	.findAll({
    where: {user_id: req.user.id },
        include: [
        {
          model: User,
          attributes: [ 'first_name']
  
        }
      ],})
	.then(orders => {
		var responseBody = {
			content:[]
		}
		orders.forEach(order => {
			responseBody.content.push(order.dataValues);
		});

		res.send(responseBody);
	})
	.catch(err => {
		console.error('Error: ', err);
		res.status(500).send(err);
	});
}

const postOrders = async (req, res,callback) => {

 
  
  
    const order = {
      user_id: req.user.id ,
      status: req.body.status ? req.body.status : "delivery"
  
    };
  
  

  const c= await Cart.findAll(
      { attributes: ['id','quantity','total_price'] , where: {  user_id: req.user.id}})

  const c3= await Order.findAll({ attributes: ['id'] , where: {  user_id: req.user.id }})

  
 

 Order.create(order)
      .then(data => {
        for(i=0;i<c.length;i++){
  const orderDetail={
    quantity:c[i].quantity,
    total_price:c[i].total_price,
    cart_id:c[i].id,
    order_id:c3[i].id
};
   

OrderDetails.create(orderDetail)
}

        res.send(
          {
           
            message:"order posted successfully"
            
  
          }
  
  
        );
  
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the order."
        });
      });
  
  }
module.exports = {
    getOrders:getOrders,
    postOrders:postOrders

}