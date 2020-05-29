// Restaurant Module
module.exports = function (sequelize, DataTypes) {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    myFunction: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [1] }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    averageRating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    averageMoney: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    averageBussy: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    averageClean: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  })
  Restaurant.associate = function (models) {
    Restaurant.hasMany(models.Review, {
      onDelete: 'cascade'
    })
  }
  return Restaurant
}
