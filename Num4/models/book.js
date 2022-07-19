"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      book_name: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: `Please input in URL format`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
