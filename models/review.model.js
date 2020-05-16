// We are exporting a function that returns a Model class.
// This function will be called from the `/models/index.js` module
// created by the sequelize-cli
module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1] }
    }
  })

  Review.associate = function (models) {

    Review.belongsTo(models.Restaurant, {
      foreignKey: { allowNull: false }
    })
  }

  return Review
}
