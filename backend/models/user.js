'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    // Un Técnico (User) puede tener muchas Órdenes de Trabajo asignadas
      User.hasMany(models.WorkOrder, {
        foreignKey: 'technicianId',
        as: 'assignedWorkOrders'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'tecnico'),
      allowNull: false,
      defaultValue: 'tecnico'
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};