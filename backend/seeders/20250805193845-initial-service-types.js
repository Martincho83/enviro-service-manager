'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ServiceTypes', [
      { name: 'Mantenimiento de Tanques y Cisternas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fumigación y Control de Plagas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mantenimiento de Espacios Verdes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Limpieza General de Áreas Comunes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Otro', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ServiceTypes', null, {});
  }
};