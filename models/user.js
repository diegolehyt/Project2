// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require('bcryptjs')
const { Model } = require('sequelize')
// Creating our User model

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON () {
      const attributes = super.toJSON()
      delete attributes.password
      return attributes
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // The password cannot be null
      password: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: ['password'] }
      },
      scopes: {
        withPassword: { attributes: {} }
      }
    }
  )

  User.beforeSave(async user => {
    if (user.changed('password')) {
      console.log('Will hash password')
      user.password = await bcrypt.hash(user.password, 14)
    }
  })

  return User
}
