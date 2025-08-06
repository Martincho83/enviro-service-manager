'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attachments', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      file_path: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING },
      workOrderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'WorkOrders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      assetId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Assets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) { await queryInterface.dropTable('Attachments'); }
};