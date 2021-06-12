
const { orders } = require("../models");
const db = require("../models");
    
    const User = db.users;
    const Order = db.orders;
    
    
    const updateOrderStatus= async function(req, res){
    
      const q = await User.findOne({ attributes: ['id'], where: {id: req.user.id } })

    const o = await Order.findOne({ attributes: ['id'], where: {id: req.body.id } })

    const id1=o.get('id');
        Order.update( req.body, {
          where: { 
            id:id1,
           }
           
        }
        )
        .then(num => {
            if (num != 1) {
             
              res.send({
                message: "Order was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Order with id=${o.get('id')}. Maybe Order was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Address with id=" +o.get('id')
            });
          });
         
      };
    
         
      
      module.exports = {
      updateOrderStatus:updateOrderStatus}