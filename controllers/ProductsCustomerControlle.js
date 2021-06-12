const { subCategories } = require("../models");
const db = require("../models");
const Product = db.products;
const Category = db.categories;
const subCategory = db.subCategories;

const Op = db.Sequelize.Op;
let myData = [];
exports.getAllAvaliabeProducts = function(req, res){

    //const subcategory_id = req.query.subcategory_id;
    //var condition = subcategory_id ? { subcategory_id: { [Op.like]: `%${subcategory_id}%` } } : null;
     
    Product.findAll({
    where:{
      is_bublished:1,
    }
    
    })
    
      .then(data => {
        res.send({
          'data':data,
          'message':"Products retrieved successfully",
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

  /////////////////////////////////////////////////////////////////////////////////////
 


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
      var condition = c1 ? { subcategory_id: { [Op.like]: `%${c1}%` } } : null;
     
      Product.findAll({
        where:{
          subcategory_id:c1,
          is_bublished:1
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
           is_bublished:1
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