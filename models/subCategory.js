
module.exports = (sequelize, Sequelize) => {

   const SubCategory = sequelize.define("subCategory", {

      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
      },
      category_id: {

         type: Sequelize.INTEGER,
         allowNull: false,
         references: {
            model: 'categories', //table name 
            key: 'id'
         }
      },
      name: {
         type: Sequelize.STRING
      }, quantity: {
         type: Sequelize.INTEGER

      },




   }, {

      tableName: "subCategories",
      timestamps: false,  // don't add the timestamp attributes (updatedAt, createdAt)

   });


   return SubCategory;

};