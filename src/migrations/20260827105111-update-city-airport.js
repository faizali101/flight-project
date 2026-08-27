'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('airports', {
      name : 'city_custom_FK',
      type : 'FOREIGN KEY',
      fields : ['cityId'],
      references : {
        table : 'cities',
        field : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('airports', 'city_custom_FK')
  }
};