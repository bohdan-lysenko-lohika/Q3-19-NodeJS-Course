'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      name: 'John Doe',
      email: 'john@doe.com'
    }, {
      name: 'Bohdan Lysenko',
      email: 'blysenko@lohika.com'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
