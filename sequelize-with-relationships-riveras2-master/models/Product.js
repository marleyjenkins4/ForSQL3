const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const Product = sequelize.define('product', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

module.exports = Product;
