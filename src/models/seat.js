'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneID'
      });
    }
  }

  Seat.init({
    airplaneID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.ENUM('economy', 'business', 'first', 'second'),
      allowNull: false,
      defaultValue: 'economy'
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });

  return Seat;
};