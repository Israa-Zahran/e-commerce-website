const { subCategories } = require("../models");
const db = require("../models");
const Product = db.products;
const Category = db.categories;
const subCategory = db.subCategories;

const Op = db.Sequelize.Op;
let myData = [];
exports.getProductsbySearch = function(req, res){
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
   
  Product.findAll({
    where:condition
  
    })
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
exports.createProduct = function(req, res){

    // Validate request
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.quantity || !req.body.subcategory_id) {
      res.status(400).send({
        message: "productName,description,price,QuantityOfProduct,subCategory_fk, can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    //key : value
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        subcategory_id: req.body.subcategory_id,

        //status: req.body.status ? req.body.status : false, 
    };
  
    // Save Tutorial in the database
    Product.create(product)
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


 
  exports.updateProductByName = function(req, res){

    const name = req.query.name;
  
    Product.update(req.body, {
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update product with name=${name}. Maybe Product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Product with name=" + name
        });
      });
     
  };
  exports.deleteProductByName = function(req, res){

    const name = req.query.name;
  
    Product.destroy({
      where: { name: name }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Product was deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete product with id=${name}. Maybe Product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Product with id=" + name
        });
      }); 
  };

  exports.getAllProducts = function(req, res){

    Product.findAll()
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
exports.getAllProductsbySearch = async (req, res) =>{  // (req, res)=>{  
    const qname = req.query.name;
    // var condition = qname ? { name: { [Op.like]: `%${qname}%` } } : null;
    
     
    // subCategory.findAll({
    // where:condition
  
    // })
      // .then(data => {
      //   res.send({
      //     'data':data,
      //     'message':"Students retrieved successfully",
      //     'status': 200
      //   });
      // })
      // .catch(err => {
      //   res.status(500).send({
      //     message:
      //       err.message || "Some error occurred while retrieving tutorials."
      //   });
      // });

      const c = await subCategory.findOne({ attributes: ['id'], where: { name: qname } })

          //console.log("+++++++++++++++++++++++++++++"+c+"++++++++++++++++++++++++++++++++");
      if (c!=null) {
        
      
      const c1 = c.get('id');
     
      Product.findAll({
     
        where:{
          subcategory_id:c1,
          
        }
    
      })
        .then(data => {
          res.send({
            'data':data,
            'message':"prkds",
            'status': 200
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });
     
  }
  
 else{
  const find_the_attr = await Category.findOne({ attributes: ['id'], where: { name: qname } })

  console.log(find_the_attr);
  const category_id = find_the_attr.get('id');
  
  subCategory.findAll({
   where:{
     category_id:category_id,
   }
 
   })
     .then(data => {
      
      const obj =  ({
         'data1':data,
         'message':"ؤؤ",
         'status': 200
       });

       for (i = 0; i < obj.data1.length; i++) {
         const subcategory_id = obj.data1[i].id;
         //const subcategory_id = obj.data1[1].id;
       Product.findAll({
         where:{
           subcategory_id:subcategory_id,
          
         }
       
         })

           .then(data => {
             let Data = ({
               'data':data,
               
             });
            myData.push(Data);
           })
           
       }
       res.send({
         'message':myData,
         'status': 200
       });
       
       
       // res.send({
       //   'message':c1,
       //   'status': 200
       // });
     })
     
     // .catch(err => {
     //   res.status(500).send({
     //     message:
     //       err.message || "Some error occurred while retrieving tutorials."
     //   });
     // });

  

   //var condition = c1 ? { subcategory_id: { [Op.like]: `%${c1}%` } } : null;


 
    }   
};

// module.exports = {
//   getAllProductsbySearch:getAllProductsbySearch
// }