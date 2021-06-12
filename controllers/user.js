const bcrypt = require('bcrypt');
const db = require("../models");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const { query } = require('express');
const atob = require('atob');
const Op = db.Sequelize.Op;
var Sequelize = require('sequelize');
//const { where } = require('sequelize/types');

//const { where } = require('sequelize/types');
const User = db.users;
const Product = db.products;
const Category = db.categories;
const Order=db.orders;
const Sales=db.sales;

        const signUp = async function (req, res) {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).json({errors: errors.array()});}
        // Validate request
         if(!req.body.first_name ||!req.body.last_name ||!req.body.mobile ||!req.body.email || !req.body.password ) {
        res.status(400).send({
        message: "The name,mobile, email and password are missing!!!"
        });
        return;
        }
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // Create a Tutorial
        const user = {
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        user_type:"customer"
        };
        // Save Tutorial in the database
        User.create(user)
        .then(data => {
        res.send({
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
            email: data.email,
            password:data.password
            
        });

        })
        .catch(err => {
        res.status(500).send({
        message:
        err.message || "Some error occurred while creating the user."
        });
        });

        }


        const addAdmin = async function (req, res) {
   
          const user = await User.findOne(
            { attributes: ['can_add_admin'] , 
            where: {  id: req.user.id}})
          

       
           if(user.get('can_add_admin')==true){
          const errors = validationResult(req);
        

          if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).json({errors: errors.array()});}
          

        // Validate request
         if(!req.body.first_name ||!req.body.last_name ||!req.body.mobile ||!req.body.email || !req.body.password ) {
         
        res.status(400).send({
        message: "The name,mobile, email and password are missing!!!"
        });
        return;
        }
       
        
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
       
        // Create a Tutorial
        const admin = {
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        user_type:"admin"
        };
        // Save Tutorial in the database
        User.create(admin)
        .then(data => {
        res.send({
            first_name: data.first_name,
            last_name: data.last_name,
            mobile: data.mobile,
            email: data.email,
            password:data.password,
            user_type:data.user_type
            
        });

        })
        .catch(err => {
        res.status(500).send({
        message:
        err.message || "Some error occurred while creating the user."
        });
        });
      }else{
        res.status(500).send({
          message: "can't add admin"
          });
        
      
      }
        }

        const signIn = async function (req, res) {
          const user = await User.findOne({ where:{email: req.body.email} });
          if (!user) return res.status(400).json({ error: 'user not found' });
          // check user password with hashed password stored in the database
          const validPassword = await bcrypt.compare(req.body.password, user.password
         );
          if (!validPassword) return res.status(400).json({ error: 'Invalid Password'
         });
          // create token
          const token = jwt.sign({
          email: user.email,
          id: user.id,
          hi:"welcome back abu 7made"
          }, process.env.JWT_SECRET)

          if(user.user_type=="customer"){

            res.json({
              
            data: 'singin of customer success',
            user: user,
            token: token
            });
          }
          else{
            res.json({
              
              data: 'singin of admin success',
              user: user,
              token: token
              });

          }
         }


           const getuserByID = async function (req, res) {

            User.findByPk(req.user.id)
              .then(data => {
                res.send({
                  data:data,
                  msg :"find by PK"
                }
              )})
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while retrieving users."
                });
              });
             
          };


        const editProfile = async function (req, res) {
    
          User.update(req.body, {
            where: { 
           id:req.user.id
            }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "User was updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update User . Maybe user was not found or req.body is empty!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating user "
              });
            });
          };


            const change_password = async  function(req, res) {
              const errors = validationResult(req);

              if (!errors.isEmpty()) {
                console.log(errors.array());
                return res.status(422).json({errors: errors.array()});
              }


              const user = await User.findOne({ where:{id: req.user.id} });
              if (!user) return res.status(400).json({ error: 'user not found' });
              // check user password with hashed password stored in the database
              const validPassword = await bcrypt.compare(req.body.oldpassword, user.password
             );
             if (!validPassword) return res.status(400).json({ error: 'Invalid OldPassword'
            });
            
            else{
               User.update({
                password:req.body.NewPassword
              },
              {
                where: {
                  id: req.user.id
                }
              })
              //.exec()
              .then(bcrypt.hash(req.body.Newpassword, 10, (err, hash) => {
           
                  if (err) {
                
                    return res.status(500).json({error: err});
                    

                  } else {
     
                    user.password = hash
                 
                    user.save()
        
                    User.findByPk(req.user.id, (err, user) => {
                      if (err) {
                        return next(err);
                      }
                    })
                    .then(result => {
                      res.status(201).json({message: "password changed"});
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({error: err});
                    });
                  }
                }));
              }
              };



              const logout = async (req, res, next) => {
               try {
                   await DATABASE('tokens').where('id', req.user.id).del();
                   return res.status(200).json({});
               } catch (error) {
                   return res.status(500).json({ message: `${JSON.stringify(error)}` });
               }
           }


           const getAllUsers =  async  function(req, res) { 
            const user = await User.findOne(
              { attributes: ['can_add_admin'] , 
              where: {  id: req.user.id}})
            User.findAll({
              where: {can_add_admin: false },
              
             })
        
               .then(data => {
                 res.send({
                   'data': data,
                   'message': "Users retrieved successfully",
                   'status': 200
                 });
               })
               .catch(err => {
                 res.status(500).send({
                   message:
                     err.message || "Some error occurred while retrieving Users."
                 });
               });
           
           }
      
            const parseJwt = function(token) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              var userdata = atob(base64);
              return(JSON.parse(userdata));
             }


             const getstatistics=(res,req)=>{
               var statistics={
                 numberOfProductsInStock:0,
                 numberOfsales:0,
                 nummberOfOrdera:0,
                // numberOfCatregories:0
               }

          Product.findAll().then((data)=>{
                statistics['numberOfProductsInStock']=data.length
               Order.findAll().then((data)=>{
                statistics['nummberOfOrdera']=data.length

                Sales.findAll({
                  where:{
                  status:1
 
                  }
                }).then((data)=>{
                  console.log(data.length)
                  statistics['numberOfsales']=data.length
                  // const ord = Order.findAll({ attributes: ['order_price'] })
                 
                  //   var income1=0;
                  //   for(i = 0; i < ord.length; i++){
                  //   income1+=ord[i].order_price;
                  //   console.log("sddddddddddddddddddddddddddddddddddddddddd"  +income1)
                  //   }
                  //   statistics['income']=income1
 req.send({ 
   data:statistics
 })
                })
               })
            })


               
               Category.findAll().then((data)=>{
                 console.log(data.length)
                 statistics['numberOfCatregories']=data.length
               })
             
             }



             const deleteUserByuAdmin = async  function(req, res){
              const user = await User.findOne(
                { attributes: ['can_add_admin'] , 
                where: {  id: req.user.id}})
              User.destroy({
                where: { 
                  id: req.params.id,
                }
              })
                .then(num => {
                  if (num == 1) {
                    res.send({
                      message: "User was deleted successfully."
                    });
                  } else {
                    res.send({
                      message: `Cannot delete User with userid=${id}. Maybe User was not found!`
                    });
                  }
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Error deleting Adress with id "+ id
                  });
                }); 
            };


           



         

module.exports = {
 signUp:signUp,
 signIn:signIn,
 getuserByID:getuserByID,
 editProfile:editProfile,
 change_password:change_password,
 parseJwt:parseJwt,
 addAdmin:addAdmin,
 logout:logout,
 getAllUsers:getAllUsers,
 getstatistics:getstatistics,
 deleteUserByuAdmin:deleteUserByuAdmin

 



};
