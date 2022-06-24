const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('categories', {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })}