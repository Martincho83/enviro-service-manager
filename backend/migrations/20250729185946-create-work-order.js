'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WorkOrders', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      work_date: { type: Sequelize.DATE, allowNull: false },
      summary: { type: Sequelize.TEXT },
      status: { type: Sequelize.ENUM('programado', 'completado', 'cancelado'), allowNull: false, defaultValue: 'programado' },
      consortiumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Consortiums', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      serviceTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ServiceTypes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      technicianId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      quoteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Quotes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('WorkOrders'); }
};