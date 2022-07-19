"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transData = require("../datas/transaction.json");

    transData.forEach((x) => {
      x.createdAt = new Date();
      x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Transactions", transData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transactions", null);
  },
};
