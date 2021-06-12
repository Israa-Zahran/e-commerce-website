const { sequelize } = require("../models");
const db = require("../models");
const sale = require("../models/sale");
const Op = db.Sequelize.Op;
const Sale = db.sales;



exports.createSale = function (req, res) {

  // Validate request
  if (!req.body.start_time || !req.body.end_time ||
    !req.body.sale_amount || !req.body.product_id || !req.body.status) {
    res.status(400).send({
      message: "Empty data!"
    });
    return;
  }

  /*
  {
     "start_time": "1/5/2021",
      "end_time": "10/5/2021",
      "sale_amount":2.5,
 }
  */
  // Create a Tutorial
  const sale = {
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    sale_amount: req.body.sale_amount,
    status: req.body.status,

    product_id: req.body.product_id,

  };

  // Save Tutorial in the database
  Sale.create(sale)
    .then(data => {

      res.send({
        'data': data
      });
    })


    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the sale."
      });
    });

}


exports.deleteSale = function (req, res) {

  const id = req.params.id;

  Sale.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Sale with id=${id}. Maybe Sale was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Sale with id="
      });
    });

} ////////////////////

exports.updateSale = function (req, res) {

  const id = req.params.id;

  Sale.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sale was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sale with id=${id}. Maybe Sale was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sale with id=" + id
      });
    });

}
//////////////////


exports.getSaleByid = function (req, res) {

  Sale.findByPk(req.params.id)
    .then(data => {
      res.send({
        data: data,
        msg: "This sale is found by findByPK "
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales."
      });
    });
}

///////////////////////

exports.update = function (req, res) {
  const roomID = req.query.id ? req.query.id : "";
  const searchString = req.query.st;
  // const searchLnameSt = lastName? `%${lastName}%` : '%%';
  // const searchFnameSt = firstName? `%${firstName}%` : '%%';

  var condition = {
    [Op.and]:
      [
        { id: { [Op.like]: `${roomID}` } },
        { status: { [Op.like]: 'available' } }
      ]
  };

  Room.findAll({
    where: condition
  })
    .then(data => {
      res.send({
        'data': data,
        'message': "Hellllo..",
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

///////////////////////////////////////////

exports.getSaleByDate = async (req, res) => {
  const id = req.params.id;
  const date = await Sale.findOne({ attributes: ['end_time'], where: { id } });
  const d1 = date.get('end_time');

  const d2 = new Date();

  const time1 = d1.getTime();
  const day1 = d1.getDay();
  const month1 = d1.getMonth();
  const year1 = d1.getYear();
  const time2 = d2.getTime();
  const day2 = d2.getDay();
  const month2 = d2.getMonth();
  const year2 = d2.getYear();

  if (day1 == day2 && month1 == month2 && year1 == year2) {
    Sale.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sale status was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update status with id=${id}. Maybe status was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating status with id=" + id
        });
      });
  } else {
    return res.send(`${d1} is not equal to ${d2}`);

  }




  //          if(d1 > d2){
  // return res.send(`${d1} is greater than ${d2}`);
  //          }else if(d1<d2){
  //           return res.send(`${d1} is lower than ${d2}`);
  //         }else if( d1 == d2){
  //           return res.send(`${d1} is equal to ${d2}`);

  //         }else{
  //           return res.send(`Ya Allah!`);

  //         }
  //    if(d1.getTime() > d2.getTime()){
  //     return res.send(`${d1} is greater than ${d2} in terms of milliseconds`)
  // } else if(d1.getYear() < d2.getYear()){
  //    return  res.send(`${d2} is greater than ${d1} in terms of years ++`)
  // } else if(d1.getDate() === d2.getDate()){
  //    return  res.send(`Both dates are equal`)
  // }

  // return res.send("end date: "+d2.getFullYear()+"   "+d1.getFullYear());

}


// This works and returns on postman: Fri Jan 04 2019 00:00:00 GMT+0200 (Israel Standard Time) is greater than Tue Jan 23 2018 00:00:00 GMT+0200 (Israel
// Standard Time) in terms of years ++
// exports.getSaleByDate=async(req, res)=>{
//   const id = req.params.id;
//   const date = await Sale.findOne({attributes:['end_time'],where: {id } });
//           const d1 = new Date('1/23/18');
//          const d2 = new Date('1/4/19');

//          if(d1.getTime() > d2.getTime()){
//           return res.send(`${d1} is greater than ${d2} in terms of milliseconds`)
//       } else if(d1.getYear() < d2.getYear()){
//          return  res.send(`${d2} is greater than ${d1} in terms of years ++`)
//       } else if(d1.getDate() === d2.getDate()){
//          return  res.send(`Both dates are equal`)
//       }

//   // return res.send("end date: "+d2.getFullYear()+"   "+d1.getFullYear());

// }

        // if (d2 < d1) ..









// this worked and returned :: Wed May 05 2021 03:17:12 GMT+0300 (Israel Daylight Time) is equal to Wed May 05 2021 00:18:02 GMT+0300 (Israel Daylight
// Time)


// exports.getSaleByDate=async(req, res)=>{
//   const id = req.params.id;
//   const date = await Sale.findOne({attributes:['end_time'],where: {id } });
//   const d1 = date.get('end_time');

//   const d2 = new Date();

//           const time1 = d1.getTime();
//           const day1 = d1.getDay();
//           const month1 = d1.getMonth();
//           const year1 = d1.getYear();
//           const time2 = d2.getTime();
//           const day2 = d2.getDay();
//           const month2 = d2.getMonth();
//           const year2 = d2.getYear();
//          if( day1==day2 && month1== month2 && year1 ==year2){
//           return res.send(`${d1} is equal to ${d2}`);
//                    }else{
//                     return res.send(`${d1} is not equal to ${d2}`);

//                    }



//                   }