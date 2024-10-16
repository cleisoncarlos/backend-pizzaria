import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'

const Pizza = sequelize.define('Pizza', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

export default Pizza;
