'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('checkouts', [
      {
        "userId": 1,
        "customerName": "Fajri",
        "phoneNumber": "08123",
        "ticketsId": 1,
        "quantity": 2,
        "totalPrice": 270000,
        "paymentStatus": "Lunas"
      },
      {
        "userId": 2,
        "customerName": "Ganela",
        "phoneNumber": "085678",
        "ticketsId": 1,
        "quantity": 1,
        "totalPrice": 135000,
        "paymentStatus": "Lunas"
      },
      {
        "userId": 3,
        "customerName": "Bhatara",
        "phoneNumber": "0812345678",
        "ticketsId": 1,
        "quantity": 1,
        "totalPrice": 135000,
        "paymentStatus": "Lunas"
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
