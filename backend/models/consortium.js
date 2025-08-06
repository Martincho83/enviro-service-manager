'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consortium extends Model {
    static associate(models) {
      Consortium.belongsTo(models.Administration, {
        foreignKey: 'administrationId',
        as: 'administration'
      });
      Consortium.hasMany(models.Quote, {
        foreignKey: 'consortiumId',
        as: 'quotes'
      });
      Consortium.hasMany(models.WorkOrder, {
        foreignKey: 'consortiumId',
        as: 'workOrders'
      });
    }
  }
  Consortium.init({
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Consortium',
    tableName: 'Consortiums' // <-- AÑADIR ESTA LÍNEA
  });
  return Consortium;
};