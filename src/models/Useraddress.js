const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo HAY QUE CAMBIAR A BRANCHOFFICE LUCAS
  sequelize.define('useraddress',
  {
    direction: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  { timestamps: false }
);
};