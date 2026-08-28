'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
    this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneID'
    });
    this.belongsTo(models.airports, {
        foreignKey: 'code'
    });
    this.belongsTo(models.airports, {
        foreignKey: 'code'
    });
    this.hasMany(models.Seat, {
    foreignKey: 'flightId',
    onDelete: 'CASCADE'
    });
   }
 }
  Flight.init({
    flightNumber: {
      type : DataTypes.STRING,
      allowNull : false
    },
    airplaneID: {
      type : DataTypes.STRING,
      allowNull : false
    },
    departureAirportID: {
      type : DataTypes.STRING,
      allowNull : false
    },
    arrivalAirportID: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    arrivalTime: {
      type : DataTypes.DATE,
      allowNull : false
    },
    departureTime: {
      type : DataTypes.DATE,
      allowNull : false
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    boardingGate: {
      type : DataTypes.STRING
    },
    totalSeats: {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};