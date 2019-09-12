'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('user', [{
                name: 'John Doe',
                email: 'john@doe.com'
            }, {
                name: 'Bohdan Lysenko',
                email: 'blysenko@lohika.com'
            }], {});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('user', null, {});
    }
};
