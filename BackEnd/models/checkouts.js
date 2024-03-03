'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checkouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  checkouts.init({
    customerName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    ticketsId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'checkouts',
  });
  return checkouts;
};