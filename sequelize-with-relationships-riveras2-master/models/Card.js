const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');
const Product = require('./Product');

const Card = sequelize.define('card', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  category : {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Product.belongsTo(Card);
Card.hasOne(Product);


module.exports = Card;
