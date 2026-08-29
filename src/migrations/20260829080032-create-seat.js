'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false
      },
      class: {
        type: Sequelize.ENUM('economy', 'business', 'first', 'second'),
        allowNull: false,
        defaultValue: 'economy'
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
      fields: ['airplaneID', 'row', 'col'],
      type: 'unique',
      name: 'unique_airplane_seat_position'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Seats', 'unique_airplane_seat_position');
    await queryInterface.dropTable('Seats');
  }
};