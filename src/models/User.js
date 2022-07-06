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
            msg: "The name can only contain letters"
          },
          len: {
            args: [2, 255],
            msg: "The name must be at least two characters"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "The email must be a valid email"
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
            msg: "The password must have at least 6 characters"
          }
        }
      },
      isactive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image:{
        type: DataTypes.STRING,
      }
    });
};