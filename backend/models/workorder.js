'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una Orden de Trabajo pertenece a un Consorcio
      WorkOrder.belongsTo(models.Consortium, {
        foreignKey: 'consortiumId',
        as: 'consortium'
      });
      // Pertenece a un Tipo de Servicio
      WorkOrder.belongsTo(models.ServiceType, {
        foreignKey: 'serviceTypeId',
        as: 'serviceType'
      });
      // Pertenece a un Técnico (Usuario)
      WorkOrder.belongsTo(models.User, {
        foreignKey: 'technicianId',
        as: 'technician'
      });
      // Pertenece a un Presupuesto (opcional)
      WorkOrder.belongsTo(models.Quote, {
        foreignKey: 'quoteId',
        as: 'quote'
      });
      // Tiene muchos Archivos Adjuntos
      WorkOrder.hasMany(models.Attachment, {
        foreignKey: 'workOrderId',
        as: 'attachments'
      });
    }
  }
  WorkOrder.init({
    work_date: DataTypes.DATE,
    summary: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WorkOrder',
  });
  return WorkOrder;
};