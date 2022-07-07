const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('useraddress', {
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "The name can only contain letters"
          },
          len: {
            args: [2, 255],
            msg: "The name must be at least two characters"
          }
        }
      },
      street_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 255],
            msg: "The password must have at least 6 characters"
          }
        }
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
};