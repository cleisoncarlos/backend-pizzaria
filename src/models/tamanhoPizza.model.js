import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pizza from '../models/pizza.model.js'

const TamanhoPizza = sequelize.define('TamanhoPizza', {
  tamanho: {
    type: DataTypes.STRING,
    allowNull: false,  // Ex: 'Pequena', 'Média', 'Grande'
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pizzaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pizza,
      key: 'id',
    }
  }
});

// Define a associação (uma pizza pode ter vários tamanhos)
Pizza.hasMany(TamanhoPizza, { foreignKey: 'pizzaId' });
TamanhoPizza.belongsTo(Pizza, { foreignKey: 'pizzaId' });

export default TamanhoPizza;
