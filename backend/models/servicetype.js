'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // Un Tipo de Servicio puede estar en muchas Órdenes de Trabajo
      ServiceType.hasMany(models.WorkOrder, {
        foreignKey: 'serviceTypeId',
        as: 'workOrders'
      });
    }
  }
  ServiceType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceType',
  });
  return ServiceType;
};