'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Presupuesto pertenece a un Consorcio
      Quote.belongsTo(models.Consortium, {
        foreignKey: 'consortiumId',
        as: 'consortium'
      });
      // Un Presupuesto puede tener una Orden de Trabajo
      Quote.hasOne(models.WorkOrder, {
        foreignKey: 'quoteId',
        as: 'workOrder'
      });
    }
  }
  Quote.init({
    quote_number: DataTypes.STRING,
    date: DataTypes.DATE,
    details: DataTypes.TEXT,
    total_amount: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};