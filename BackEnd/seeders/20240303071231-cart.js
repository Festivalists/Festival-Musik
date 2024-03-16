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
    await queryInterface.bulkInsert('carts', [
      {
        "userId": 1,
        "customerName": "Sahal",
        "phoneNumber": "08123",
        "ticketsId": 2,
        "quantity": 2,
        "totalPrice": 300000
      },
      {
        "userId": 2,
        "customerName": "Jeisa",
        "phoneNumber": "085678",
        "ticketsId": 2,
        "quantity": 1,
        "totalPrice": 150000
      },
      {
        "userId": 3,
        "customerName": "Genta",
        "phoneNumber": "0812345678",
        "ticketsId": 3,
        "quantity": 1,
        "totalPrice": 175000
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
