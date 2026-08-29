'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const constraints = await queryInterface.getForeignKeyReferencesForTable('Flights');
    const hasIbfk3 = constraints.some(c => c.constraintName === 'Flights_ibfk_3');

    if (hasIbfk3) {
      await queryInterface.removeConstraint('Flights', 'Flights_ibfk_3');
    }

    await queryInterface.addColumn('Flights', 'departureAirportID_new', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('Flights', 'arrivalAirportID_new', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE Flights f
      JOIN airports a ON a.code = f.departureAirportID
      SET f.departureAirportID_new = a.id
    `);
    await queryInterface.sequelize.query(`
      UPDATE Flights f
      JOIN airports a ON a.code = f.arrivalAirportID
      SET f.arrivalAirportID_new = a.id
    `);

    await queryInterface.removeColumn('Flights', 'departureAirportID');
    await queryInterface.removeColumn('Flights', 'arrivalAirportID');

    await queryInterface.renameColumn('Flights', 'departureAirportID_new', 'departureAirportID');
    await queryInterface.renameColumn('Flights', 'arrivalAirportID_new', 'arrivalAirportID');

    await queryInterface.changeColumn('Flights', 'departureAirportID', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('Flights', 'arrivalAirportID', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint('Flights', {
      fields: ['departureAirportID'],
      type: 'foreign key',
      name: 'flights_departure_airport_fk',
      references: { table: 'airports', field: 'id' },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Flights', {
      fields: ['arrivalAirportID'],
      type: 'foreign key',
      name: 'flights_arrival_airport_fk',
      references: { table: 'airports', field: 'id' },
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