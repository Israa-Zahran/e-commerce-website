const db = require("../models");
const { use } = require("../routes/address");
const Address= db.addresses;
const Op = db.Sequelize.Op;
const User = db.users;


exports.createAddress = function(req, res){

    // Validate request
    if (!req.body.country || !req.body.city || !req.body.street1 || !req.body.street2 ) {
      res.status(400).send({
        message: "country, city,street1, street2 and userId can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    //key : value
    const address = {
        country: req.body.country,
        city: req.body.city,
        street1: req.body.street1,
        street2: req.body.street2,
        user_id: req.user.id,
    };
  
    // Save Tutorial in the database
    Address.create(address)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Address."
        });
      });
     
  };

  exports.getaddressByID = function(req, res){
    Address.findAll({
      where: {user_id: req.user.id },
        attributes: ['country','city','street1','street2'],
       // order: [['createdAt', 'DESC']],
        include: [
          { 
            model: User, // load all users data
            attributes: ['email']  
          },
        ],
        //paranoid: false //to retrieve even the deleted records
     })
      .then(data => {
        res.send({
          'data':data,
          'message':"Address retrieved successfully",
          'status': 200
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
     
  };


  exports.updateAddressByuserId= function(req, res){
    Address.update(req.body, {
      where: { 
        user_id: req.user.id,
       }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Address was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Address with id=${user_id}. Maybe Address was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Address with id=" + user_id
        });
      });
     
  };


  exports.deleteaddressByuserID = function(req, res){
    Address.destroy({
      where: { 
        user_id: req.user.id,
      }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Address was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Address with userid=${user_id}. Maybe Address was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Adress with user_id "+ user_id
        });
      }); 
  };
