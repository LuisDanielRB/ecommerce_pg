const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('event', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: INTEGER,
      allowNull: false
    },
    date: {
      type: DATE,
      allowNull: false
    },
    artist: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    place: {
      type: STRING,
      allowNull: false
    },
    stock: {
      type: INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  })
}