const db = require("../models");
//const Category = require("../models/category");
//const subCategory = require("../models/subCategory");
const Category = db.categories;
const subCategory = db.subCategories;
const Product = db.products;

const Op = db.Sequelize.Op;
let myData = [];
//var subcategory_id;
exports.createCategory= function(req, res){

    // Validate request
    if (!req.body.name  || !req.body.quantity ) {
      res.status(400).send({
        message: "Category Name,QuantityOfCategory can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    //key : value
    const category = {
        name: req.body.name,
        
        quantity: req.body.quantity,

        //status: req.body.status ? req.body.status : false, 
    };
  
    // Save Tutorial in the database
    Category.create(category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product."
        });
      });
     
  };




exports.updateCategoryByName = function(req, res){

    const name = req.query.name;
  
    Category.update(req.body, {
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with name=${name}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with name=" + name
        });
      });
     
  };

  exports.deleteCategoryByName = function(req, res){

    const name = req.query.name;
  
    Category.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${name}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Category with name=" + name
        });
      }); 
  };