"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Input Email` },
          notEmpty: { msg: `Input Email` },
          isEmail: { msg: `Input must be Email format` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [6], msg: `Please insert Password minimal 8 character` },
          notNull: { msg: `Input Password` },
          notEmpty: { msg: `Input Password` },
        },
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Input Name` },
          notEmpty: { msg: `Input Name` },
        },
      },
      user_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Input Address` },
          notEmpty: { msg: `Input Address` },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
