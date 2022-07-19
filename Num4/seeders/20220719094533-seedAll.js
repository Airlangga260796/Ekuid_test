"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = require("../datas/user.json");
    const bookData = require("../datas/book.json");

    userData.forEach((x) => {
      delete x.id;
      x.password = bcrypt.hashSync(x.password, 10);
      x.createdAt = new Date();
      x.updatedAt = new Date();
    });
    bookData.forEach((x) => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", userData);
    await queryInterface.bulkInsert("Books", bookData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null);
    await queryInterface.bulkDelete("Books", null);
  },
};
