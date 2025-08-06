'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administration extends Model {
    static associate(models) {
      Administration.hasMany(models.Consortium, {
        foreignKey: 'administrationId',
        as: 'consortiums'
      });
    }
  }
  Administration.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    cuit: { type: DataTypes.STRING, unique: true },
    contact_person: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, { sequelize, modelName: 'Administration' });
  return Administration;
};