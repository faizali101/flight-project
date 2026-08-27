'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      this.belongsTo(models.Flight, {
        foreignKey: 'flightId'
      });
    }
  }
  Seat.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.ENUM('economy', 'business', 'first_class'),
      allowNull: false,
      defaultValue: 'economy'
    },
    status: {
      type: DataTypes.ENUM('available', 'booked', 'blocked'),
      allowNull: false,
      defaultValue: 'available'
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};