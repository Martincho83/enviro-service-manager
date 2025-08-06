'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Assets', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false },
      brand: { type: Sequelize.STRING },
      model: { type: Sequelize.STRING },
      serial_number: { type: Sequelize.STRING, unique: true },
      purchase_date: { type: Sequelize.DATE },
      status: { type: Sequelize.ENUM('disponible', 'en uso', 'mantenimiento'), allowNull: false, defaultValue: 'disponible' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('Assets'); }
};