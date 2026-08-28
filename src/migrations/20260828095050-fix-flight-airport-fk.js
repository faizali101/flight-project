'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove old constraints FIRST, before touching column types
    await queryInterface.removeConstraint('Flights', 'Flights_ibfk_3');

    // Now safe to change column types
    await queryInterface.changeColumn('Flights', 'departureAirportID', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('Flights', 'arrivalAirportID', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Add the corrected constraints
    await queryInterface.addConstraint('Flights', {
      fields: ['departureAirportID'],
      type: 'foreign key',
      name: 'flights_departure_airport_fk',
      references: {
        table: 'airports',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Flights', {
      fields: ['arrivalAirportID'],
      type: 'foreign key',
      name: 'flights_arrival_airport_fk',
      references: {
        table: 'airports',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Flights', 'flights_departure_airport_fk');
    await queryInterface.removeConstraint('Flights', 'flights_arrival_airport_fk');

    await queryInterface.changeColumn('Flights', 'departureAirportID', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Flights', 'arrivalAirportID', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};