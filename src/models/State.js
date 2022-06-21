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
          isAlpha: {
            msg: "El nombre solo puede contener letras"
          },
          len: {
            args: [2, 255],
            msg: "El nombre tiene que ser minimamente de dos caracters"
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
            msg: "La contraseña tiene que tener minimamente 6 caracteres"
          }
        }
      },
    });
};