const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    name: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "El email tiene que ser un correo valido"
          }
        }
      },
      admin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "La contraseña tiene que tener minimamente 6 caracteres"
          }
        }
      },
    });
};