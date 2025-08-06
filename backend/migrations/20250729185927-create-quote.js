'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      quote_number: { type: Sequelize.STRING, allowNull: false, unique: true },
      date: { type: Sequelize.DATE, allowNull: false },
      details: { type: Sequelize.TEXT },
      total_amount: { type: Sequelize.DECIMAL(10, 2) },
      status: { type: Sequelize.ENUM('pendiente', 'aprobado', 'rechazado'), allowNull: false, defaultValue: 'pendiente' },
      consortiumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Consortiums', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('Quotes'); }
};