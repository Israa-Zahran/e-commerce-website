const db = require("../models");
//const Category = require("../models/category");
//const subCategory = require("../models/subCategory");
const Category = db.categories;
const SubCategory = db.subCategories;
const Product = db.products;

const Op = db.Sequelize.Op;
let myData = [];
//var subcategory_id;
exports.createsubCategory= function(req, res){

    // Validate request
    if (!req.body.name  || !req.body.quantity|| !req.body.category_id) {
      res.status(400).send({
        message: "subCategory Name,QuantityOfsubCategory,category_id can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    //key : value
    const subCategory = {
        name: req.body.name,
        
        quantity: req.body.quantity,
        category_id:req.body.category_id
        //status: req.body.status ? req.body.status : false, 
    };
  
    // Save Tutorial in the database
    SubCategory.create(subCategory)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the subCategory."
        });
      });
     
  };



exports.updatesubCategoryByName = function(req, res){

    const name = req.query.name;
  
    SubCategory.update(req.body, {
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "subCategory was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update subCategory with name=${name}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating subCategory with name=" + name
        });
      });
     
  };

  exports.deletesubCategoryByName = function(req, res){

    const name = req.query.name;
  
    SubCategory.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "subCategory was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete subCategory with id=${name}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting subCategory with name=" + name
        });
      }); 
  };