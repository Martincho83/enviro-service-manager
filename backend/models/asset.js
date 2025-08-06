'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Activo (Herramienta) puede tener muchos Adjuntos (ej. fotos de mantenimiento)
      Asset.hasMany(models.Attachment, {
        foreignKey: 'assetId',
        as: 'attachments'
      });
    }
  }
  Asset.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};