// Restaurant Module
module.exports = function (sequelize, DataTypes) {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [1] }
    }
  })

  Restaurant.associate = function (models) {
    Restaurant.hasMany(models.Review, { 
      onDelete: 'cascade' 
    })
  }

  return Restaurant
}
