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

    await queryInterface.bulkInsert('events', [
      {
        "festivalName": "Play Fest 22",
        "performers": "Fiersa Besari---Juicy Luicy---Club Dangdut Racun",
        "price": 135000,
        "image": "/images/event/play-fest-22.jpg"
      },
      {
        "festivalName": "Play Music Festival 2023 Mataram Lombok NTB",
        "performers": "Tulus---Mahalini---Four Twenty",
        "price": 150000,
        "image": "/images/event/play-music-festival-23.jpg"
      },
      {
        "festivalName": "GRIP FEST.iN",
        "performers": "Tulus---Feel Koplo---Vierratale---The Joeys---Akbar Mandela",
        "price": 175000,
        "image": "/images/event/grip-fest-in.jpg"
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
