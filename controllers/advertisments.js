const { sequelize } = require("../models");
const db = require("../models");
const ads = require("../models/advertisment");
const Op = db.Sequelize.Op;
const Ads = db.advertisments;
const Admin = db.admins;

/* id, ads_title, ads_type, ads_location, ads_price, ads_start, ads_end, image_id, user_id */


exports.createAd = function (req, res) {
  // Validate request
  if (!req.body.ads_title || !req.body.ads_type || !req.body.ads_location || !req.body.ads_price ||
    !req.body.ads_start || !req.body.ads_end || !req.body.admin_id) {
    res.status(400).send({
      message: "Empty data!"
    });
    return;
  }


  // Create a Tutorial
  const ad = {
    ads_title: req.body.ads_title,
    ads_type: req.body.ads_type,
    ads_location: req.body.ads_location,
    ads_price: req.body.ads_price,
    ads_start: req.body.ads_start,
    ads_end: req.body.ads_end,
    image_id: req.body.image_id,
    admin_id: req.body.admin_id,

  };
  const userID = req.body.admin_id;

  var condition = { ID: { [Op.eq]: `${userID}` } };


  Ads.create(ad, condition)
    .then(data => {

      res.send({
        'data': data
      });
    })


    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ad."
      });
    });

}

exports.deleteAds = function (req, res) {

  const id = req.params.id;

  Ads.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ad was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete ad with id=${id}. Maybe ad was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting ad with id=" + id
      });
    });

}


exports.updateAd = function (req, res) {

  const id = req.params.is;

  Ads.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ad was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ad with id=${id}. Maybe ad was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ad with id=" + id
      });
    });

}
