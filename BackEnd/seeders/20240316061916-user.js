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

    await queryInterface.bulkInsert('users', [
      {
        name: 'Sahal Fajri',
        email: 'sahal@gmail.com'
      },
      {
        name: 'Muhammad Jeisa Ganela Putra',
        email: 'jeisa@gmail.com'
      },
      {
        name: 'Genta Bhatara Anggasani Putra',
        email: 'genta@gmail.com'
      }
    ], {})
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
