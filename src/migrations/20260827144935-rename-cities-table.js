'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('cities', 'Cities');
  },
  async down(queryInterface) {
    await queryInterface.renameTable('Cities', 'cities');
  }
};
