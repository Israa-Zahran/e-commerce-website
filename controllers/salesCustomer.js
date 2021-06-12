const { sequelize } = require("../models");
const db = require("../models");
const sale = require("../models/sale");
const Op = db.Sequelize.Op;
const Sale = db.sales;


 
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
 

///////////////////////////////////////////

// exports.getSaleByDate = async (req, res) => {
//   const id = req.params.id;
//   const date = await Sale.findOne({ attributes: ['end_time'], where: { id } });
//   const d1 = date.get('end_time');

//   const d2 = new Date();

//   const time1 = d1.getTime();
//   const day1 = d1.getDay();
//   const month1 = d1.getMonth();
//   const year1 = d1.getYear();
//   const time2 = d2.getTime();
//   const day2 = d2.getDay();
//   const month2 = d2.getMonth();
//   const year2 = d2.getYear();

//   if (day1 == day2 && month1 == month2 && year1 == year2) {
//     Sale.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Sale status was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update status with id=${id}. Maybe status was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating status with id=" + id
//         });
//       });
//   } else {
//     return res.send(`${d1} is not equal to ${d2}`);

//   }

