'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Insertar Estados
    await queryInterface.bulkInsert('TicketStatuses', [
      { name: 'Abierto', createdAt: new Date(), updatedAt: new Date() },
      { name: 'En Progreso', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Esperando Respuesta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Resuelto', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cerrado', createdAt: new Date(), updatedAt: new Date() },
    ], {});
    
    // Insertar Categorías
    await queryInterface.bulkInsert('TicketCategories', [
      { name: 'Problema de Hardware', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Problema de Software', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Problema de Red', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Solicitud de Acceso', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Otro', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TicketStatuses', null, {});
    await queryInterface.bulkDelete('TicketCategories', null, {});
  }
};