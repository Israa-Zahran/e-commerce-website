const { sequelize } = require("../models");
const db = require("../models");
const ads = require("../models/advertisment");
const Op = db.Sequelize.Op;
const Ads = db.advertisments;
const Admin = db.admins;
 

exports.getAdByid = function (req, res) {
  Ads.findByPk(req.params.id)
    .then(data => {
      res.send({
        data: data,
        msg: "This ad is found by findByPK "
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ads."
      });
    });
}

  ///////////////////////
