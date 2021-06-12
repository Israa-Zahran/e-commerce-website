const { subCategories } = require("../models");
const db = require("../models");
const Product = db.products;
const Category = db.categories;
const subCategory = db.subCategories;

const Op = db.Sequelize.Op;
exports.getAllsubCategory = function(req, res){

    subCategory.findAll()
      .then(data => {
        res.send({"data":data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
     
  };

  exports.getAllCategory = function(req, res){

    Category.findAll()
      .then(data => {
        res.send({"data":data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
     
  };