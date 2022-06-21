const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    image:{
      type: DataTypes.STRING
    },
    discount:{
      type: DataTypes.INTEGER,
    },
    stock:{
      type: DataTypes.INTEGER,
    },
    description:{
      type: DataTypes.TEXT
    }
  },{ timestamps: false });
};
