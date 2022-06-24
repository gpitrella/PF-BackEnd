const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('useraddress', {
    photo: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING,
        validate: {
            len: {
              args: [2, 55],
              msg: "El numero tiene que ser minimamente de dos caracters"
            }
          }
    },
    street: {
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
            msg: "La contraseña tiene que tener minimamente 6 caracteres"
          }
        }
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
};