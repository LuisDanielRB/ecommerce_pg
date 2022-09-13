const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'El email tiene que ser un email valido'
          }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: { 
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
    },
  {
    timestamps: false,
    createdAt: false,
    updateAt: false,
  });
};