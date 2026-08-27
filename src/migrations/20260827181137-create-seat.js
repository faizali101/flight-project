'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Flights', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      seatNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      class: {
        type: Sequelize.ENUM('economy', 'business', 'first_class'),
        allowNull: false,
        defaultValue: 'economy'
      },
      status: {
        type: Sequelize.ENUM('available', 'booked', 'blocked'),
        allowNull: false,
        defaultValue: 'available'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Seats', {
      fields: ['flightId', 'seatNumber'],
      type: 'unique',
      name: 'unique_flight_seat_constraint'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Seats', 'unique_flight_seat_constraint');
    await queryInterface.dropTable('Seats');
  }
};