'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Adjunto pertenece a una Orden de Trabajo
      Attachment.belongsTo(models.WorkOrder, {
        foreignKey: 'workOrderId',
        as: 'workOrder'
      });
      // Un Adjunto pertenece a un Activo (Herramienta)
      Attachment.belongsTo(models.Asset, {
        foreignKey: 'assetId',
        as: 'asset'
      });
    }
  }
  Attachment.init({
    file_path: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attachment',
  });
  return Attachment;
};