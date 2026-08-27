'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airports extends Model {
    static associate(models) {
    this.belongsTo(models.City, {
        foreignKey: 'cityId'
    });
    this.hasMany(models.Flight, {
        foreignKey: 'departureAirportID',
        onDelete: 'CASCADE'
    });
    this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportID',
        onDelete: 'CASCADE'
    });
  }
}
  airports.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'airports',
  });
  return airports;
};