// We are exporting a function that returns a Model class.
// This function will be called from the `/models/index.js` module
// created by the sequelize-cli
module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1] }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    money: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    bussy: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    clean: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  })

  Review.associate = function (models) {
    Review.belongsTo(models.Restaurant, {
      foreignKey: { allowNull: false }
    })
  }

  return Review
}
