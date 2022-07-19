"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Book, { foreignKey: "id_book" });
    }
  }
  Transaction.init(
    {
      id_book: {
        type: DataTypes.INTEGER,
        min: {
          args: 1,
          msg: `Book Id are not allowed to be 0`,
        },
        notEmpty: {
          msg: `Book Id are not allowed to be empty`,
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        min: {
          args: 1,
          msg: `User Id are not allowed to be 0`,
        },
        notEmpty: {
          msg: `User Id are not allowed to be empty`,
        },
      },
      status: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
