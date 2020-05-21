// We are exporting a function that returns a Model class.
// This function will be called from the `/models/index.js` module
// created by the sequelize-cli
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [1] }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { len: [1] }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: { len: [1] }
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Review, {
      foreignKey: { allowNull: true }
    })
  }

  return User
}
