const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('state', {
    state_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: "The name must be at least two characters"
          }
        }
      }, 
      country:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Argentina',
        validate: {
          len: {
            args: [2, 255],
            msg: "The password must have at least 6 characters"
          }
        }
      },
    });
};